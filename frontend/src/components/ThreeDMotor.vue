<template>
  <section class="relative flex flex-col gap-4 px-4 pt-8">
    <div class="flex items-center justify-between">
      <h2 class="text-black dark:text-white text-2xl font-bold">3D 모터 상태 뷰어</h2>
      <button
        type="button"
        class="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white transition hover:bg-white/10 dark:border-white/20"
        @click="resetCamera"
      >
        카메라 리셋
      </button>
    </div>
    <div class="motor-viewer">
      <div class="motor-viewer-stage">
        <div ref="threeContainer" class="three-canvas"></div>
        <div class="hud">마우스: 드래그=회전, 휠=줌, 우클릭=패닝</div>
      </div>
      <aside v-if="activeComponent" class="detail-panel" :class="{ hidden: !isDetailOpen }">
        <div class="detail-header">
          <h2>{{ activeComponent.name }}</h2>
          <button type="button" class="detail-close" @click="closeDetailPanel">닫기</button>
        </div>
        <div class="detail-body">
          <div class="status-pill" :class="detailStatusClass">
            {{ detailStatusText }}
          </div>
          <div class="metric-card">
            <span class="metric-title">현재 이상 스코어</span>
            <span class="metric-value">{{ detailScore }}</span>
            <span class="metric-trend">{{ detailTrend }}</span>
          </div>
          <div class="metric-card">
            <span class="metric-title">온도</span>
            <span class="metric-value">{{ detailTemperature }}</span>
            <span class="metric-trend">{{ detailTemperatureTrend }}</span>
          </div>
          <div class="metric-card">
            <span class="metric-title">진동 (RMS)</span>
            <span class="metric-value">{{ detailVibration }}</span>
            <span class="metric-trend">{{ detailVibrationTrend }}</span>
          </div>
          <div class="metric-card">
            <span class="metric-title">최근 이벤트</span>
            <div class="subsystems">
              <template v-if="detailEvents.length">
                <div v-for="eventItem in detailEvents" :key="eventItem.title" class="subsystem-row">
                  <div class="subsystem-label">
                    <strong>{{ eventItem.title }}</strong>
                    <span>{{ eventItem.note }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="subsystem-row">
                  <div class="subsystem-label">
                    <strong>최근 경고 없음</strong>
                    <span>이벤트가 기록되면 여기에 표시됩니다.</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="metric-card">
            <span class="metric-title">구성 요소 상태</span>
            <div class="subsystems">
              <div
                v-for="component in componentSummary"
                :key="component.id"
                class="subsystem-row"
                :class="{
                  'subsystem-row--active': activeComponent && component.id === activeComponent.id,
                  'subsystem-row--clickable': true
                }"
                @click="openDetailPanel(component)"
              >
                <div class="subsystem-label">
                  <strong>{{ component.name }}</strong>
                  <span>스코어 {{ component.score.toFixed(2) }} · {{ component.status === 1 ? '이상' : '정상' }}</span>
                </div>
                <div class="status-pill" :class="component.status === 1 ? 'status-1' : 'status-0'">
                  {{ component.status === 1 ? '이상' : '정상' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const threeContainer = ref(null)
const motorMeta = createMotorMeta()
const selectedComponent = ref(null)
const isDetailOpen = ref(false)

const componentSummary = computed(() => motorMeta.components ?? [])
const activeComponent = computed(() => selectedComponent.value ?? componentSummary.value[0] ?? null)
const detailEvents = computed(() => selectedComponent.value?.events ?? motorMeta.events ?? [])
const detailStatusText = computed(() => (activeComponent.value?.status === 1 ? '이상 감지' : '정상'))
const detailStatusClass = computed(() => (activeComponent.value?.status === 1 ? 'status-1' : 'status-0'))
const detailScore = computed(() => (activeComponent.value?.score ?? 0).toFixed(2))
const detailTrend = computed(() => activeComponent.value?.trend ?? motorMeta.trend ?? '')
const detailTemperature = computed(() => {
  const current = activeComponent.value?.temperature?.current
  return typeof current === 'number' ? `${current}°C` : 'N/A'
})
const detailTemperatureTrend = computed(() => activeComponent.value?.temperature?.note ?? '')
const detailVibration = computed(() => {
  const current = activeComponent.value?.vibration?.current
  return typeof current === 'number' ? `${current} mm/s` : 'N/A'
})
const detailVibrationTrend = computed(() => activeComponent.value?.vibration?.note ?? '')

let scene = null
let camera = null
let renderer = null
let controls = null
let motorGroup = null
let motorParts = []
let animationId = null
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let pointerMoveHandler = null
let canvasClickHandler = null

const openDetailPanel = (component) => {
  if (!component) return
  selectedComponent.value = component
  isDetailOpen.value = true
  highlightComponent(component.id)
}

const closeDetailPanel = () => {
  isDetailOpen.value = false
  highlightComponent(null)
}

const resetCamera = () => {
  if (!motorGroup || !camera || !controls) return
  fitCameraToMotor()
}

const initThree = () => {
  const container = threeContainer.value
  if (!container) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#0b0f18')

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.domElement.style.cursor = 'grab'
  container.innerHTML = ''
  container.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  )
  camera.position.set(3, 2.2, 3.4)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 1.1
  controls.maxDistance = 9

  const ambient = new THREE.AmbientLight(0xffffff, 0.65)
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.9)
  keyLight.position.set(5, 6, 4)
  const rimLight = new THREE.DirectionalLight(0x70b7ff, 0.3)
  rimLight.position.set(-4, 3, -6)
  scene.add(ambient, keyLight, rimLight)

  motorGroup = new THREE.Group()
  motorGroup.position.y = 0.4
  scene.add(motorGroup)

  motorParts = createMotorGeometry(motorMeta.components)
  motorParts.forEach((part) => motorGroup.add(part.mesh))
  updatePartColors(motorParts)

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(4.5, 64),
    new THREE.MeshStandardMaterial({ color: 0x101622, roughness: 1, metalness: 0 })
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.75
  scene.add(ground)

  const defaultComponent =
    motorMeta.components?.find((component) => component.status === 1) ??
    motorMeta.components?.[0] ??
    null
  if (defaultComponent) {
    openDetailPanel(defaultComponent)
  }

  fitCameraToMotor()
  animate()

  window.addEventListener('resize', onResize)
  pointerMoveHandler = (event) => onPointerMove(event)
  canvasClickHandler = (event) => onCanvasClick(event)
  renderer.domElement.addEventListener('pointermove', pointerMoveHandler)
  renderer.domElement.addEventListener('click', canvasClickHandler)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  if (controls) {
    controls.update()
  }
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

const onResize = () => {
  if (!renderer || !camera || !threeContainer.value) return
  const w = threeContainer.value.clientWidth
  const h = threeContainer.value.clientHeight
  camera.aspect = w / Math.max(h, 1)
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  fitCameraToMotor()
}

const onPointerMove = (event) => {
  if (!renderer || !camera) return
  updatePointer(event)
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(getPickableMeshes(), false)
  renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab'
}

const onCanvasClick = (event) => {
  if (!renderer || !camera) return
  updatePointer(event)
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(getPickableMeshes(), false)
  if (!intersects.length) return
  const match = motorParts.find((part) => part.mesh === intersects[0].object)
  if (match?.component) {
    openDetailPanel(match.component)
  }
}

const updatePointer = (event) => {
  if (!renderer) return
  const rect = renderer.domElement.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  pointer.x = (x / rect.width) * 2 - 1
  pointer.y = -(y / rect.height) * 2 + 1
}

const getPickableMeshes = () =>
  motorParts.filter((part) => part.interactive !== false).map((part) => part.mesh)

const highlightComponent = (componentId) => {
  motorParts.forEach((part) => {
    if (!part.mesh?.material || !('emissive' in part.mesh.material)) return
    const isSelected = componentId && part.component?.id === componentId
    const emissive = isSelected ? new THREE.Color(0.1, 0.2, 0.35) : getDefaultEmissive(part.component)
    part.mesh.material.emissive.copy(emissive)
    part.mesh.material.needsUpdate = true
  })
}

const fitCameraToMotor = () => {
  if (!motorGroup || !camera || !controls || !threeContainer.value) return

  const box = new THREE.Box3().setFromObject(motorGroup)
  const center = box.getCenter(new THREE.Vector3())
  const sphere = new THREE.Sphere()
  box.getBoundingSphere(sphere)

  const container = threeContainer.value
  const aspect = container.clientWidth / Math.max(container.clientHeight, 1)
  const verticalFov = THREE.MathUtils.degToRad(camera.fov)
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect)

  const sinVertical = Math.max(Math.sin(verticalFov / 2), 0.0001)
  const sinHorizontal = Math.max(Math.sin(horizontalFov / 2), 0.0001)
  const distanceForVertical = sphere.radius / sinVertical
  const distanceForHorizontal = sphere.radius / sinHorizontal
  const distance = Math.max(distanceForVertical, distanceForHorizontal)
  const offset = distance * 0.85

  const horizontalTargetOffset = sphere.radius * 0.38
  const target = new THREE.Vector3(center.x + horizontalTargetOffset, center.y, center.z)
  const viewDirection = new THREE.Vector3(0.65, 0.32, 1).normalize()
  const cameraPosition = viewDirection.clone().multiplyScalar(offset).add(target)

  camera.position.copy(cameraPosition)
  camera.lookAt(target)
  controls.target.copy(target)
  controls.minDistance = Math.max(distance * 0.35, 0.75)
  controls.maxDistance = distance * 2.2
  controls.update()
}

const disposeThree = () => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  if (renderer?.domElement) {
    renderer.domElement.removeEventListener('pointermove', pointerMoveHandler)
    renderer.domElement.removeEventListener('click', canvasClickHandler)
  }
  controls?.dispose()
  motorGroup?.traverse((child) => {
    if (child.isMesh) {
      child.geometry?.dispose()
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => mat.dispose?.())
      } else {
        child.material?.dispose?.()
      }
    }
  })
  renderer?.dispose()
  scene = null
  camera = null
  renderer = null
  controls = null
  motorGroup = null
  motorParts = []
  animationId = null
  pointerMoveHandler = null
  canvasClickHandler = null
}

function createMotorMeta() {
  return {
    id: 'ac-motor-01',
    name: 'AC 모터 #01',
    status: 0,
    score: 0.18,
    trend: '지난 24시간 평균 0.12',
    temperature: { current: 63, note: '허용 범위 40~75°C' },
    vibration: { current: 2.6, note: 'ISO 10816 기준 양호' },
    events: [
      { title: '6분 전 · 베어링 온도 67°C', note: '냉각팬 RPM을 확인하세요.' },
      { title: '43분 전 · 진동 스파이크', note: '고정자 전류 불균형 감지.' },
    ],
    components: [
      {
        id: 'housing',
        name: '모터 하우징',
        status: 0,
        score: 0.12,
        baseColor: '#1a7fad',
        trend: '최근 1시간 평균 0.09',
        temperature: { current: 58, note: '외부 케이스 온도 안정' },
        vibration: { current: 1.8, note: '정상 범위' },
      },
      {
        id: 'stator',
        name: '고정자',
        status: 0,
        score: 0.21,
        baseColor: '#2d4f9e',
        trend: '최근 30분 상승 추세',
        temperature: { current: 66, note: '권선 저항 상승 감시' },
        vibration: { current: 2.4, note: '자기력 균형 유지' },
      },
      {
        id: 'rotor',
        name: '회전자',
        status: 1,
        score: 0.87,
        baseColor: '#cbd6dd',
        trend: '최근 5분 급상승',
        temperature: { current: 72, note: '허용치 근접 · 윤활 확인' },
        vibration: { current: 3.7, note: '임계치 접근 · 정밀 진단 필요' },
        events: [
          { title: '2분 전 · 진동 3.9mm/s', note: '좌측 베어링 공진 의심' },
          { title: '8분 전 · 온도 알람', note: '냉각 라인 확인 요망' },
        ],
      },
      {
        id: 'fan',
        name: '냉각 팬',
        status: 0,
        score: 0.16,
        baseColor: '#2a3545',
        trend: '안정적',
        temperature: { current: 54, note: '흡입구 온도 정상' },
        vibration: { current: 1.2, note: '균형 양호' },
      },
      {
        id: 'terminal',
        name: '단자함',
        status: 0,
        score: 0.09,
        baseColor: '#1b748c',
        trend: '안정적',
        temperature: { current: 47, note: '내부 온도 정상' },
        vibration: { current: 0.4, note: '진동 영향 미미' },
      },
    ],
  }
}

function createMotorGeometry(components = []) {
  const parts = []
  const getComponent = (id) => components.find((component) => component.id === id)
  const makeMaterial = (color, metalness, roughness) =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness,
      roughness,
    })
  const addPart = (mesh, component, interactive = false) => {
    mesh.userData.component = component
    parts.push({ mesh, component, interactive })
    return mesh
  }

  const housingComp = getComponent('housing')
  const statorComp = getComponent('stator')
  const rotorComp = getComponent('rotor')
  const fanComp = getComponent('fan')
  const terminalComp = getComponent('terminal')

  const housingMaterial = makeMaterial(housingComp?.baseColor ?? '#1a7fad', 0.55, 0.35)
  const housingShell = addPart(
    new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 1.65, 64, 1, false), housingMaterial.clone()),
    housingComp,
    true
  )
  housingShell.rotation.z = Math.PI / 2

  const finMaterial = makeMaterial(housingComp?.baseColor ?? '#1a7fad', 0.5, 0.38)
  const finCount = 18
  const finLength = 1.7
  const finHeight = 0.1
  const finDepth = 0.32
  const finRadius = 0.66
  for (let i = 0; i < finCount; i += 1) {
    const angle = (i / finCount) * Math.PI * 2
    const radialY = Math.cos(angle)
    if (radialY < -0.4) continue
    const fin = addPart(
      new THREE.Mesh(new THREE.BoxGeometry(finLength, finHeight, finDepth), finMaterial.clone()),
      housingComp
    )
    fin.rotation.x = angle
    fin.position.set(0, radialY * finRadius, Math.sin(angle) * finRadius)
  }

  const frontPlateMat = makeMaterial('#a3c5d4', 0.65, 0.25)
  const frontPlate = addPart(
    new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.08, 0.24, 48), frontPlateMat),
    housingComp
  )
  frontPlate.rotation.z = Math.PI / 2
  frontPlate.position.x = 0.95

  const frontLip = addPart(
    new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.14, 0.08, 48), makeMaterial('#7ca3b7', 0.5, 0.35)),
    housingComp
  )
  frontLip.rotation.z = Math.PI / 2
  frontLip.position.x = 1.04

  const frontHub = addPart(
    new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 0.2, 32), makeMaterial('#d2e3ea', 0.72, 0.2)),
    housingComp
  )
  frontHub.rotation.z = Math.PI / 2
  frontHub.position.x = 1.12

  const boltMaterial = makeMaterial('#d7d9dd', 0.55, 0.2)
  const boltRadius = 0.95
  const boltPositions = 6
  for (let i = 0; i < boltPositions; i += 1) {
    const theta = (i / boltPositions) * Math.PI * 2
    const bolt = addPart(
      new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.28, 16), boltMaterial.clone()),
      housingComp
    )
    bolt.rotation.x = Math.PI / 2
    bolt.rotation.z = Math.PI / 2
    bolt.position.set(1.05, Math.cos(theta) * boltRadius, Math.sin(theta) * boltRadius)
  }

  const rearCover = addPart(
    new THREE.Mesh(
      new THREE.CylinderGeometry(0.84, 0.88, 0.32, 48),
      makeMaterial(fanComp?.baseColor ?? '#2a3545', 0.45, 0.55)
    ),
    fanComp,
    true
  )
  rearCover.rotation.z = Math.PI / 2
  rearCover.position.x = -0.88

  const rearGrill = addPart(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 24)), fanComp)
  rearGrill.material = makeMaterial('#d7d9dd', 0.4, 0.6)
  rearGrill.rotation.z = Math.PI / 2
  rearGrill.position.x = -1.02

  const grillBars = 8
  for (let i = 0; i < grillBars; i += 1) {
    const angle = (i / grillBars) * Math.PI
    const bar = addPart(
      new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 0.04), makeMaterial('#5b6574', 0.35, 0.6)),
      fanComp
    )
    bar.rotation.x = Math.PI / 2
    bar.rotation.z = angle
    bar.position.x = -0.99
  }

  const basePlate = addPart(
    new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 1.2), makeMaterial('#102835', 0.35, 0.75)),
    housingComp
  )
  basePlate.position.y = -1.0

  const baseRiserGeom = new THREE.BoxGeometry(0.7, 0.24, 1.1)
  ;[0.72, -0.72].forEach((offset) => {
    const riser = addPart(
      new THREE.Mesh(baseRiserGeom.clone(), makeMaterial('#153848', 0.3, 0.7)),
      housingComp
    )
    riser.position.set(offset, -0.92, 0)
  })

  const footPadGeom = new THREE.BoxGeometry(0.78, 0.08, 1.28)
  ;[0.72, -0.72].forEach((offset) => {
    const pad = addPart(
      new THREE.Mesh(footPadGeom.clone(), makeMaterial('#0c1d26', 0.25, 0.8)),
      housingComp
    )
    pad.position.set(offset, -1.12, 0)
  })

  if (terminalComp) {
    const terminalBody = addPart(
      new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.45, 0.62),
        makeMaterial(terminalComp.baseColor ?? '#1b748c', 0.5, 0.4)
      ),
      terminalComp,
      true
    )
    terminalBody.position.set(-0.18, 0.84, 0)

    const terminalCap = addPart(
      new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.08, 0.68), makeMaterial('#215f73', 0.4, 0.55)),
      terminalComp
    )
    terminalCap.position.set(-0.18, 1.07, 0)

    const handle = addPart(
      new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 12, 36), makeMaterial('#c62828', 0.2, 0.35)),
      terminalComp
    )
    handle.rotation.x = Math.PI / 2.4
    handle.position.set(-0.18, 1.17, 0)

    const cablePort = addPart(
      new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.36, 24), makeMaterial('#0c1d26', 0.3, 0.65)),
      terminalComp
    )
    cablePort.rotation.z = Math.PI / 2
    cablePort.position.set(-0.6, 0.78, 0)
  }

  if (statorComp) {
    const stator = addPart(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.58, 0.58, 1.45, 48),
        makeMaterial(statorComp.baseColor ?? '#2d4f9e', 0.35, 0.55)
      ),
      statorComp,
      true
    )
    stator.rotation.z = Math.PI / 2
    stator.position.x = -0.02
  }

  if (rotorComp) {
    const rotor = addPart(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.34, 1.55, 48),
        makeMaterial(rotorComp.baseColor ?? '#cbd6dd', 0.55, 0.35)
      ),
      rotorComp,
      true
    )
    rotor.rotation.z = Math.PI / 2
    rotor.position.x = 0.0

    const shaft = addPart(
      new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 3.6, 32), makeMaterial('#b5b8bd', 0.62, 0.28)),
      rotorComp
    )
    shaft.rotation.z = Math.PI / 2

    const shaftShoulder = addPart(
      new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.28, 32), makeMaterial('#d9dcdf', 0.6, 0.25)),
      rotorComp
    )
    shaftShoulder.rotation.z = Math.PI / 2
    shaftShoulder.position.x = 1.3

    const shaftTip = addPart(
      new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.46, 32), makeMaterial('#e7e9eb', 0.58, 0.18)),
      rotorComp
    )
    shaftTip.rotation.z = Math.PI / 2
    shaftTip.position.x = 1.56
  }

  return parts
}

function updatePartColors(parts) {
  parts.forEach(({ mesh, component }) => {
    if (!component || !mesh.material) return
    const isFaulty = component.status === 1
    const baseColorHex = component.baseColor ?? '#9aa0a6'
    const base = isFaulty ? new THREE.Color('#ff4d4f') : new THREE.Color(baseColorHex)
    mesh.material.color?.copy?.(base)
    if ('emissive' in mesh.material) {
      const emissive = getDefaultEmissive(component)
      mesh.material.emissive.copy(emissive)
    }
  })
}

function getDefaultEmissive(component) {
  if (!component) {
    return new THREE.Color('#04090f')
  }
  return component.status === 1 ? new THREE.Color(0.25, 0, 0) : new THREE.Color('#04090f')
}

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  disposeThree()
})
</script>

<style scoped>
.motor-viewer {
  position: relative;
  height: 540px;
  border-radius: 18px;
  overflow: hidden;
  background: #0b0f18;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.motor-viewer-stage {
  position: relative;
  height: 100%;
  width: 100%;
}

.three-canvas {
  width: 100%;
  height: 100%;
}

.three-canvas :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.hud {
  position: absolute;
  top: 12px;
  left: 12px;
  color: #f5f5f5;
  font-size: 14px;
  line-height: 1.4;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 10px;
  border-radius: 8px;
  pointer-events: none;
}

.detail-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: rgba(12, 16, 24, 0.94);
  backdrop-filter: blur(12px);
  box-shadow: -16px 0 32px rgba(0, 0, 0, 0.3);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transform: translateX(0);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.detail-panel.hidden {
  transform: translateX(20px);
  opacity: 0;
  pointer-events: none;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #f5f5f5;
}

.detail-close {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #f5f5f5;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.detail-close:hover {
  background: rgba(255, 255, 255, 0.16);
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex: 1;
  padding-right: 6px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-1 {
  background: rgba(255, 77, 79, 0.15);
  color: #ff4d4f;
}

.status-0 {
  background: rgba(154, 160, 166, 0.15);
  color: #c4c8cc;
}

.metric-card {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9aa0a6;
}

.metric-value {
  font-size: 24px;
  font-weight: 600;
  color: #f5f5f5;
}

.metric-trend {
  font-size: 12px;
  color: #9aa0a6;
}

.subsystems {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subsystem-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  transition: background 0.2s ease, border 0.2s ease;
}

.subsystem-row--clickable {
  cursor: pointer;
}

.subsystem-row--clickable:hover {
  background: rgba(0, 188, 212, 0.12);
}

.subsystem-row--active {
  background: rgba(0, 188, 212, 0.18);
  border: 1px solid rgba(0, 188, 212, 0.4);
}

.subsystem-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #f5f5f5;
}

.subsystem-label strong {
  font-size: 15px;
}

.subsystem-label span {
  font-size: 12px;
  color: #9aa0a6;
}

@media (max-width: 1024px) {
  .detail-panel {
    width: 100%;
    position: relative;
    height: auto;
    box-shadow: none;
  }

  .motor-viewer {
    height: 480px;
  }
}
</style>

#!/bin/bash

# API 연동 설정 스크립트
# 이 스크립트는 프론트엔드 API 연동을 위한 초기 설정을 자동화합니다.

echo "🚀 PMS Frontend API 연동 설정 시작..."
echo ""

# 1. .env 파일 생성
if [ ! -f .env ]; then
    echo "📝 .env 파일 생성 중..."
    echo "VITE_API_BASE_URL=http://localhost:8080" > .env
    echo "✅ .env 파일 생성 완료"
else
    echo "ℹ️  .env 파일이 이미 존재합니다."
fi

echo ""

# 2. npm 패키지 설치 확인
if [ ! -d "node_modules" ]; then
    echo "📦 npm 패키지 설치 중..."
    npm install
    echo "✅ npm 패키지 설치 완료"
else
    echo "ℹ️  node_modules가 이미 존재합니다."
fi

echo ""
echo "✅ 설정 완료!"
echo ""
echo "📚 다음 단계:"
echo "   1. 백엔드 서버 실행: cd ../backend && ./mvnw spring-boot:run"
echo "   2. 프론트엔드 실행: npm run dev"
echo "   3. 브라우저에서 http://localhost:5173 접속"
echo ""
echo "🧪 API 테스트:"
echo "   브라우저 개발자 도구 콘솔에서 다음 명령어 실행:"
echo "   - window.testApi.checkConnection()  // API 연결 확인"
echo "   - window.testApi.testAll()          // 모든 API 테스트"
echo ""
echo "📖 자세한 내용은 README_API.md 또는 API_INTEGRATION_GUIDE.md를 참조하세요."


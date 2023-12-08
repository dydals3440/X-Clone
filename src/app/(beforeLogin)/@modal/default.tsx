export default function Default() {
  return null;
}

// 레이아웃 입장에서는
// 주소가 z.com 일떄는 children -> page.tsx
// modal -> @modal/default.tsx

// 주소가 localhost:3001/i/flow/login 떄는
// childrern -> i/flow/login/page.tsx
// modal -> @modal/i/flow/login/page.tsx

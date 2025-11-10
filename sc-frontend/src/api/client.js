const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080';

// 공용: 안전 JSON 파서
async function safeJson(res) {
  if (res.status === 204) return null;       // No Content
  const text = await res.text();             // 우선 텍스트로
  if (!text) return null;                    // 비어있으면 null
  try { return JSON.parse(text); }           // JSON이면 파싱
  catch { return null; }                     // JSON이 아니면 null
}

// (선택) Location 헤더에서 id 뽑기 (서버가 Location: /Community/{id} 보낼 때)
function idFromLocation(res) {
  const loc = res.headers.get('Location');
  if (!loc) return null;
  const m = loc.match(/\/(\d+)(?:$|[?#])/);
  return m ? Number(m[1]) : null;
}

export async function createCommunityPost(payload) {
  try {
    console.log('Creating post with payload:', payload);
    const res = await fetch(`${BASE_URL}/Community`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    console.log('Response status:', res.status);
    
    // 응답 본문을 한 번만 읽기
    const responseText = await res.text();
    console.log('Response body:', responseText);
    
    if (!res.ok) {
      let errorData = null;
      try {
        errorData = responseText ? JSON.parse(responseText) : null;
      } catch (e) {
        // JSON 파싱 실패 시 텍스트 그대로 사용
        console.error('Error parsing error response:', e);
      }
      const errorMsg = errorData?.message || errorData?.error || errorData?.detail || responseText || `Failed to create post: ${res.status}`;
      throw new Error(errorMsg);
    }

    let data = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      console.warn('Failed to parse response as JSON:', e);
    }
    
    // id를 여러 경로로 시도
    const id = data?.id ?? data?.postId ?? data?.data?.id ?? idFromLocation(res);
    return { ...data, id };
  } catch (err) {
    console.error('createCommunityPost error:', err);
    // 네트워크 오류인 경우 더 명확한 메시지 제공
    if (err.message === 'Failed to fetch' || err.message.includes('Load failed') || err.message.includes('NetworkError')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw err;
  }
}

export async function fetchCommunityList() {
  const res = await fetch(`${BASE_URL}/Community`);
  if (!res.ok) throw new Error(`Failed to fetch list: ${res.status}`);
  return await safeJson(res);
}

export async function fetchCommunityPost(id) {
  const res = await fetch(`${BASE_URL}/Community/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  return await safeJson(res);
}

export async function updateCommunityPost(id, payload) {
  const res = await fetch(`${BASE_URL}/Community/${id}`, {
    method: 'PATCH',                               // 서버가 PUT만 허용하면 PUT으로 교체
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update post: ${res.status}`);
  return await safeJson(res);                      // 204인 경우 null 반환
}

export async function deleteCommunityPost(id) {
  const res = await fetch(`${BASE_URL}/Community/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete post: ${res.status}`);
  return true;
}

// 회원가입
export async function signup(payload) {
  try {
    console.log('Signup payload:', payload);
    console.log('Signup URL:', `${BASE_URL}/api/auth/signup`);
    
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    console.log('Signup response status:', res.status);
    const responseText = await res.text();
    console.log('Signup response body:', responseText);
    
    if (!res.ok) {
      let errorData = null;
      try {
        errorData = responseText ? JSON.parse(responseText) : null;
        console.log('Signup error data:', errorData);
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      const errorMsg = errorData?.message || errorData?.error || errorData?.detail || responseText || `회원가입 실패: ${res.status}`;
      throw new Error(errorMsg);
    }

    let data = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      console.warn('Failed to parse response as JSON:', e);
    }
    
    return data;
  } catch (err) {
    console.error('signup error:', err);
    if (err.message === 'Failed to fetch' || err.message.includes('Load failed') || err.message.includes('NetworkError')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw err;
  }
}

// 로그인
export async function login(payload) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    const responseText = await res.text();
    
    if (!res.ok) {
      let errorData = null;
      try {
        errorData = responseText ? JSON.parse(responseText) : null;
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      const errorMsg = errorData?.message || errorData?.error || errorData?.detail || responseText || `로그인 실패: ${res.status}`;
      throw new Error(errorMsg);
    }

    let data = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      console.warn('Failed to parse response as JSON:', e);
    }
    
    return data;
  } catch (err) {
    console.error('login error:', err);
    if (err.message === 'Failed to fetch' || err.message.includes('Load failed') || err.message.includes('NetworkError')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw err;
  }
}

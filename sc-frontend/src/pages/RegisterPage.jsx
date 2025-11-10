import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/client'
import '../styles/RegisterPage.css'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    
    if (!formData.id || !formData.password || !formData.nickname) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      // 백엔드가 요구하는 필드명에 맞춰서 전송
      // 백엔드는 username과 email을 필수로 요구함
      const payload = {
        username: formData.id,  // 백엔드는 username을 요구 (프론트엔드의 id를 username으로 매핑)
        password: formData.password,
        nickname: formData.nickname,
        email: `${formData.id}@smu.ac.kr`,  // 백엔드가 필수로 요구하므로 임시 이메일 생성
      }
      
      console.log('RegisterPage - Sending payload:', payload)
      await signup(payload)
      alert('회원가입이 완료되었습니다.')
      navigate('/login')
    } catch (err) {
      console.error('RegisterPage - Error:', err)
      alert(`회원가입 실패: ${err.message || err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-icon">
          <span>💭</span>
        </div>
        
        <h1><Link to="/" className="logo-link">sm-connect</Link> 회원가입</h1>
        <p className="subtitle">상명대학교 커뮤니티</p>
        

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="id">아이디 (3-10자)</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호 (6자 이상)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임 (3-15자)</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="login-link">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage


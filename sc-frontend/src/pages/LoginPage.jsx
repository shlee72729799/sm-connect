import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAPI } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import '../styles/LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login: setLoginState } = useAuth()
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    autoLogin: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.id || !formData.password) {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      // 백엔드가 요구하는 필드명에 맞춰서 전송 (username을 요구함)
      const payload = {
        username: formData.id,  // 프론트엔드의 id를 백엔드의 username으로 매핑
        password: formData.password,
      }
      
      await loginAPI(payload)
      setLoginState() // 로그인 상태 업데이트
      navigate('/')
    } catch (err) {
      alert(`로그인 실패: ${err.message || err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="mascot">
          <div className="mascot-duck">🐤</div>
        </div>

        <h1><Link to="/" className="logo-link">sm-connect</Link></h1>
        <p className="subtitle">상명대학교 커뮤니티</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디"
              autoFocus
              className="id-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="password-input"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoLogin"
                checked={formData.autoLogin}
                onChange={handleChange}
              />
              <span>자동 로그인</span>
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <Link to="/register" className="signup-btn">
            회원가입
          </Link>
        </form>

        <div className="footer-links">
          <Link to="#forgot" className="forgot-link">
            계정&amp;비번찾기
          </Link>
          <Link to="/" className="home-link">
            메인으로
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/MainPage.css'
import { fetchCommunityList } from '../api/client'

const MainPage = () => {
  const { isLoggedIn, logout } = useAuth()
  const popularPosts = [
    { title: '스뭉이 본체 발견', comments: 27 },
    { title: '공학관 또 맷돼지 출현', comments: 9 },
    { title: '상명대 앞 지하철역 건설 계획..', comments: 37 },
    { title: '상명대 언덕밑 엘레베이터 설치 계획..', comments: 14 },
  ]

  const freeBoard = [
    { title: '객프 진짜 꿀과목 ㅇㅈ?', comments: 1 },
    { title: '[기념품샵] 이월 돕바 상품 떨이합니다~♥', comments: 1 },
    { title: '이번주 주말 개꿀 대외활동 할 사람?', comments: 6 },
  ]

  const [communityPosts, setCommunityPosts] = useState([])

  useEffect(() => {
    fetchCommunityList()
      .then((data) => {
        setCommunityPosts(Array.isArray(data) ? data : (data?.data ?? []))
      })
      .catch(() => {})
  }, [])

  const anonymous1 = [
    { title: '성적조회를 위한 ...', comments: 0 },
    { title: '집이 회사랑 멀면 자취밖에 답이 없나요', comments: 3 },
   
  ]

  const anonymous2 = [
    { title: '공대과목이 학년올라갈수록 빡세지는 이유가', comments: 0 },
    { title: '순자산 3억 달성', comments: 7 },
    { title: '막스 베버 책 읽다가 빨갱이로 몰린 사람', comments: 0 },
  ]

  const jobBoard = [
    { title: '카카오 현직자 계신가요? 질문드리고싶은...', comments: 1 },
    { title: '네이버페이 면접준비하려고 하는데 직무면접 대...', comments: 3 },
    { title: '취업 관련해 문의드립니다.', comments: 0 },
  ]

  const recruitment = [
    { title: '[모집] 종로구청장 공약이행 점검 주민배심...', comments: 0 },
    { title: '[창업지원단] 정기창업간담회 "런치톡" 4, 5...', comments: 0 },
    { title: '이번주 주말 개꿀 대외활동 할 사람?!', comments: 1 },
  ]

  const BoardSection = ({ title, icon, iconText, posts }) => (
    <div className="board-section">
      <div className="board-header">
        <span className="board-icon">{iconText}</span>
        <h3>{title}</h3>
        <Link to="/detail" className="more-link">+ 더보기</Link>
      </div>
      <ul className="post-list">
        {posts.map((post, index) => (
          <li key={index}>
            <span className="post-title">{post.title}</span>
            {post.comments > 0 && <span className="comment-count">[{post.comments}]</span>}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="main-page">
      <header className="main-header">
        <div className="header-content">
          <Link to="/" className="logo">sm-connect</Link>
          <nav className="main-nav">
            <a href="#community">커뮤니티</a>
            <a href="#career">커리어</a>
            <a href="#life">생활</a>
            <a href="#genealogy">족보실</a>
            <a href="#all">전체글</a>
            <a href="#popular">인기글</a>
          </nav>
          <div className="auth-links">
            {!isLoggedIn ? (
              <>
                <Link to="/register">회원가입</Link>
                <Link to="/login">로그인</Link>
              </>
            ) : (
              <>
                <a href="#mypage">내 페이지</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>로그아웃</a>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="banner">
        따뜻한 SM Connect
        <Link to="/detail" className="write-button">글작성</Link>
      </div>

      <div className="main-content">
        <div className="content-grid">
          <BoardSection 
            title="오늘의 인기글" 
            icon="👍" 
            iconText="👍" 
            posts={popularPosts} 
          />
          <div className="board-section">
            <div className="board-header">
              <span className="board-icon">💬</span>
              <h3>자유게시판</h3>
              <Link to="/detail" className="more-link">+ 더보기</Link>
            </div>
            <ul className="post-list">
              {freeBoard.map((post, index) => (
                <li key={`seed-${index}`}>
                  <span className="post-title">{post.title}</span>
                  {post.comments > 0 && <span className="comment-count">[{post.comments}]</span>}
                </li>
              ))}
              {communityPosts.map((p) => (
                <li key={p.id}>
                  <Link className="post-title" to={`/detail/${p.id}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <BoardSection 
            title="익게1" 
            icon="👤" 
            iconText="👤" 
            posts={anonymous1} 
          />
          <BoardSection 
            title="익게2" 
            icon="💬" 
            iconText="💬" 
            posts={anonymous2} 
          />
          <BoardSection 
            title="취업게시판" 
            icon="💼" 
            iconText="💼" 
            posts={jobBoard} 
          />
          <BoardSection 
            title="모집공고" 
            icon="📢" 
            iconText="📢" 
            posts={recruitment} 
          />
        </div>
      </div>

      <footer className="main-footer">
        <a href="#mypage">내페이지</a>
        <a href="#schedule">학사일정</a>
        <a href="#notice">학교공지</a>
        <a href="#reading">열람실</a>
        <a href="#cafeteria">학식</a>
      </footer>
    </div>
  )
}

export default MainPage





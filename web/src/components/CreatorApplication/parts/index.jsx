import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`

export const Dialogue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  max-width: 70vw;
  max-height: 95vh;
  overflow: scroll;
  padding: 32px;
  background-color: #121212;
  transition: 0.3s ease-in-out;
  width: 1200px;
  height: 100%;
  z-index: 10;
  border-radius: 25px;
  padding: 32px;
  @media screen and (max-width: 600px) {
    padding: 32px 8px;
    max-width: 90vw;
    max-height: 90vh;
  }
`

export const Copy = styled.p`
  margin: 16px auto;
  text-align: center;
  max-width: 600px;
  max-height: 300px;
  overflow-y: scroll;
`

export const Title = styled.h1`
  font-size: 2rem;
`

export const Logo = styled.img`
  width: 200px;
`

export const SubTitle = styled.h6``

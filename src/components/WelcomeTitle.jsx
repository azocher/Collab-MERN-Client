import styled, { keyframes }  from 'styled-components'

const fade = keyframes`
    0% {
        opacity: 0;
    }

    25% {
        opacity: .25;
    }

    50% {
        opacity: .5;
    }

    100% {
        opacity: 1;
    }
`

// const titleHolder = styled.title`
//     text-align: center;
//     `
    
const Header = styled.h1`
    color: black;
    animation: ${fade} 5s linear;
`
const SubHeader = styled(Header)`
    animation: ${fade} 8s linear;
    color: black;
`

export default function WelcomeTitle () {
    return(
        <div>
            
                <Header>This is Family...</Header>
                <SubHeader>This is Falendar</SubHeader>
                
        </div>    
    )

}
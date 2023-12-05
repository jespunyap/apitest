const HeaderComponent = props => {
    return(
        <header>
            {props.title && <h1>{props.title}</h1>}
        </header>
    )
}
export default HeaderComponent;
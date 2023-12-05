const LoadingComponent = props => {
    return(
        <>
            {props.loading && <p>...Loading...</p>}
        </>
    )
}
export default LoadingComponent;
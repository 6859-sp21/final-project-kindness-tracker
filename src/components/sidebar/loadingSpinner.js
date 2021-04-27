import '../../styles/Loading.css'

const LoadingSpinner = () => {
    console.log('rendering loading')
    return (
        <div className="loading-wrapper">
            <div className="la-ball-clip-rotate la-2x">
                <div></div>
            </div>
            <p>Loading...</p>
        </div>
    )
}

export default LoadingSpinner

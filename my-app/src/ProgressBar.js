// How to Create an Accessible Progress Bar With React BY MARY GATHONI
// https://www.makeuseof.com/react-progress-bar-accessible-create/
import './ProgressBar.css'

const ProgressBar = ({ progress }) => {
  const generateGradient = (progress) => {
    return `linear-gradient(to right, #595959 ${progress - 20}%, lightgrey ${
      progress + 10
    }%, white 100%)`
  }

  const bar = {
    height: '100%',
    width: `${progress}%`,
    backgroundImage: generateGradient(progress),
    overFlow: 'hidden',
    borderTopRightRadius: '3rem',
    borderBottomRightRadius: '3rem',

    transition: 'width 2s ease-in-out',
    border: '5px solid black',
  }

  return (
    <div className="container">
      <div
        style={bar}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="label-container">
          <span className="label">{`${progress}%`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

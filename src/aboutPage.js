import { Button } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import summaryImage from './summary_image.png'
import yodaImage from './yoda_transparent.png'
import { Link } from 'react-router-dom'

import './styles/About.css'

const AboutPage = () => {
  return (
    <div className="App app-about">
      <div>
        <div className="about-big-text">
          <h1>😊 Kindness Tracker</h1>
        </div>
        <Link to='/'>
          <Button
            variant="contained"
            color="primary"
            className="about-launch-button"
          >
            Launch App &nbsp; <ArrowForwardIcon />
          </Button>
        </Link>
        <div className="about-header-text">
          <p>Christian Moroney (<code>cmoroney</code>)</p>
          <p>Jackson Bernatchez (<code>jrnerbat</code>)</p>
          <p>Kevin Lyons (<code>kalyons</code>)</p>
          <p><code><a href="mailto:kindness-tracker@mit.edu">kindness-tracker@mit.edu</a></code></p>
          <p><b>6.859 Final Project Spring 2021</b></p>
          <img src={summaryImage} className="about-summary-image" />
        </div>

        <div className="about-content-left">
          <h2>Abstract</h2>
          <p>TODO Abstract goes here</p>
          <h2>Paper</h2>
          <p>TODO Click here to access our paper on this work.</p>
          <h2>Source Code</h2>
          <div className="about-horizontal-stack">
            <p>View the source code for our application on GitHub <a href="https://github.com/6859-sp21/final-project-kindness-tracker" target="_blank">here</a>.</p>
            <div>
              <a href="https://github.com/6859-sp21/final-project-kindness-tracker" target="_blank">
                <img className="sidebar-git-image about-git-image" src="https://image.flaticon.com/icons/png/512/25/25231.png"></img>
              </a>
            </div>
          </div>
          <h2>Trailer Video</h2>
          <p>TODO insert video here.</p>
          <h2>Google Form for Submissions</h2>
          <p>You can submit acts of kindness using our Google form here, using ID number <b>123</b>:</p>
          <p><a href="http://bit.ly/your-kindness" target="_blank"><code>bit.ly/your-kindness</code></a></p>
          <h2>Original Demo Video</h2>
          <div className="about-video-wrapper">
            <video width="100%" controls="controls">
              <source src="https://www.dropbox.com/s/5whse10x4ziqafc/6859%20-%20Kindness%20Tracker.mp4?raw=1" type="video/mp4" />
            </video>
          </div>


          <img src={yodaImage} className="yoda-image" />
        </div>
      </div>
    </div>
  )
}

export default AboutPage

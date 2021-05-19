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
        <Link to='/' target="_blank" rel="noopener noreferrer">
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
          <h2>Trailer Video</h2>
          <p>TODO insert video here.</p>
          <h2>Abstract</h2>
          <p>In the midst of current economic, political, and public health concerns, we believe that being kind to one
          another is more important than ever. That's why we developed Kindness Tracker, a data collection and
          visualization application for random acts of kindness. Utilizing physical "Kindness Cards", an active
          database, and a front-end application, we are able to visualize the spread of kindness across the country
          between friends, family, and total strangers. We have found that not only is it an enjoyable experience to
          observe the spread of kindness, but also a catalyst for future acts of kindness in viewers. Our hope is that
            this application plays a small role in increasing happiness across the country.</p>
          <h2>Paper</h2>
          <p>Click <Link to='/paper' target="_blank" rel="noopener noreferrer"><b>here</b></Link> to access our paper on this work.</p>
          <h2>Source Code</h2>
          <div className="about-horizontal-stack">
            <p>View the source code for our application on GitHub <a href="https://github.com/6859-sp21/final-project-kindness-tracker" target="_blank"><b>here</b></a>.</p>
            <div>
              <a href="https://github.com/6859-sp21/final-project-kindness-tracker" target="_blank">
                <img className="sidebar-git-image about-git-image" src="https://image.flaticon.com/icons/png/512/25/25231.png"></img>
              </a>
            </div>
          </div>
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

import React, { Component } from 'react'
import { FadeIn, SlideDown, SlideUp } from 'onscreen-effects'
import css from './home.scss'
import 'whatwg-fetch'
import Watson from 'watson-developer-cloud'
import Chart from 'chart.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.alchemyLanguage = Watson.alchemy_language({
      api_key: 'c95dbf0c2f57e42d126a1cb23e419983b8441b0d',
      withCredentials: false
    });
    this.loadDevSiteComment = () => this._loadDevSiteComment()
    this.emotions = (content, type) => this._emotions(content, type)
    this.state = { comments: [], contentType: 'text' }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.contentType !== this.state.contentType) {
      this.setState({ content: '', anger: '', disgust: '', fear: '', joy: '', sadness: '', comments: [] })
    }
  }
  _emotions(content, type='text') {
    /* Alchemy doesnt seem to support HTML content yet, so for now the default will be plain text */
    this.alchemyLanguage.emotion({ text: content }, (err, response) => {
      if (err) {
        console.log(err);
        alert(`Alchemy ${err}`);
        this.setState({ anger: '', disgust: '', fear: '', joy: '', sadness: '' });
      } else {
        this.setState(response.docEmotions);
      }
    });
  }
  _loadDevSiteComment() {
    fetch(this.state.content)
      .then(response => response.json())
      .then(json => {
        this.setState({ comments: json.comments }, () => {
          let allComments = '';
          this.state.comments.forEach((comment) => {
            allComments += comment.body
          })
          this.emotions(allComments, 'text')
        })
      }).catch((error) => console.log(error))
  }
  render() {
    const { comments } = this.state;
    return(
      <div>
        <h1>Data Science Project</h1>
        <Filter parent={this} {...this.state} />
        <Content parent={this} {...this.state} />
      </div>
    )
  }
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.parent = this.props.parent;
    this.selectContentType = (e) => this._selectContentType(e)
    this.handleChange = (e) => this._handleChange(e)
    this.handleSubmit = (e) => this._handleSubmit(e)
  }
  _selectContentType(e) {
    e.preventDefault()
    this.parent.setState({ contentType: e.currentTarget.dataset.type })
  }
  _handleChange(e) {
    this.parent.setState({ content: e.currentTarget.value })
  }
  _handleSubmit(e) {
    e.preventDefault();
    const { contentType, content } = this.props;
    if(contentType === 'text' || contentType === 'html') {
      this.parent.emotions(content, contentType);
    } else {
      this.parent.loadDevSiteComment();
    }
  }
  render() {
    const { contentType, content } = this.props;
    return(
      <div>
        <div className={css.filterContainer}>
          <a href='#' data-type='text' onClick={this.selectContentType} className={contentType === 'text' ? css.selected : null} >Text</a>
          <a href='#' data-type='html' onClick={this.selectContentType} className={contentType === 'html' ? css.selected : null} >HTML</a>
          <a href='#' data-type='comment' onClick={this.selectContentType} className={contentType === 'comment' ? css.selected : null} >Development Site URL</a>
        </div>
        <form onSubmit={this.handleSubmit} className={css.filterContent}>
          {
            contentType === 'text' &&
            <textarea value={content} onChange={this.handleChange} placeholder='But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.' />
          }

          {
            contentType === 'html' &&
            <textarea value={content} onChange={this.handleChange} placeholder='<p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>' />
          }

          {
            contentType === 'comment' &&
            <input type='text' value={content} onChange={this.handleChange} placeholder='ex. https://milieu.io/en/dev_sites/1822/comments.json' />
          }
          <input type='submit' value='Extract Emotions' />
        </form>
      </div>
    );
  }
}

class Content extends Component {
  constructor(props) {
    super(props)
    this.generateChart = (type) => this._generateChart(type)
  }
  componentDidUpdate() {
    if(this.props.joy) {
      this.generateChart();
    }
  }
  formatEmotion(str) {
    return (parseFloat(str) * 100).toFixed(0)
  }
  _generateChart() {
    const { anger, disgust, fear, joy, sadness, contentType } = this.props;
    const chart = document.getElementById('chart')
    var myChart = new Chart(chart, {
      type: 'doughnut',
      animation:{
        animateScale:true
      },
      data: {
        labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'],
        datasets: [{
          label: 'emotion',
          data: [this.formatEmotion(anger), this.formatEmotion(disgust), this.formatEmotion(fear), this.formatEmotion(joy), this.formatEmotion(sadness)],
          backgroundColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      },
      options: {
        legend: {
          position: 'left'
        }
      }
    });
  }
  render() {
    const { contentType, comments, joy } = this.props;
    return(
      <div>
        {
          this.props.joy &&
          <SlideUp duration={1500}>
            <canvas id='chart' width='500' height='300'></canvas>
          </SlideUp>
        }

        {
          contentType === 'comment' &&
          <div>
            {
              comments.map((comment, i) => {
                return(
                  <SlideDown key={comment.id} delay={250} duration={1500}>
                    <section>
                      <div className={css.index}>{i+1}.</div>
                      <div>
                        <div className={css.body} dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}></div>
                      </div>
                    </section>
                  </SlideDown>
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}

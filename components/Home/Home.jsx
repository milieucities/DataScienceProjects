import React, { Component } from 'react'
import css from './home.scss'
import 'whatwg-fetch'
import Watson from 'watson-developer-cloud'


const RICHMOND_COMMENTS_URL = 'https://milieu.io/en/dev_sites/1822/comments.json'

export default class extends Component {
  constructor(props) {
    super(props)
    this.alchemyLanguage = Watson.alchemy_language({
      api_key: 'd4576505b093e0997a1603c4e965f2e28f5b59f1',
      withCredentials: false
    });
    this.loadDevSiteComment = () => this._loadDevSiteComment()
    this.emotions = (comment) => this._emotions(comment)
    this.loadDevSiteComment()
    this.state = { comments: [] }
  }
  _emotions(comment) {
    this.alchemyLanguage.emotion({ text: comment }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(response));
      }
    });
  }
  _loadDevSiteComment() {
    fetch(RICHMOND_COMMENTS_URL)
      .then(response => response.json())
      .then(json => this.setState({ comments: json.comments }))
      .catch((error) => console.log(error))
  }
  render() {
    const { comments } = this.state;
    return(
      <div>
        <h1>Richmond Comments</h1>
        {
          comments.map((comment, i) => {
            if(i == 0) this.emotions(comment.body)
            return(
              <section key={comment.id}>
                <div className={css.index}>{i+1}.</div>
                <div>
                  <div className={css.body} dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}></div>
                </div>
              </section>
            )
          })
        }
      </div>
    )
  }
}

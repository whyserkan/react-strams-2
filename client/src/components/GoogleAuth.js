import React, {Component} from 'react'
import { connect } from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1056824219254-aas574gjmk9iotlgq99abg7ggv12k4ug.apps.googleusercontent.com',
                scope:'email'
            }).then(() =>  {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setSignedIn()
                this.listenAuth()
            })
        })
    }

    listenAuth() {
        this.auth.isSignedIn.listen(() => this.setSignedIn())
    }

    setSignedIn() {
        
        if (this.auth.isSignedIn.get()){
            this.props.signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderSignedIn() {
        if (this.props.isSignedIn === null) {
            return null
        } else 
        if (this.props.isSignedIn) {
            return (
                <div>
                    <button onClick={this.onSignOutClick}>Sign out</button> 
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.onSignInClick}>Sign in</button> 
                </div>
            )
        }
    }
    render() {
        return(
            <div>{this.renderSignedIn()}</div>
        )
    }
}

const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)
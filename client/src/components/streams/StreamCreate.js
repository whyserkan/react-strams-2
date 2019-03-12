import React from 'react'
import { Field, reduxForm } from 'redux-form' 

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = "Enter title"
    }
    if (!values.description) {
        errors.description = "Enter desc"
    }
    return errors
}

class StreamCreate extends React.Component {
    renderError = meta => {
        if (meta.touched) {
            return <div>{meta.error}</div>
        }
    }

    inputComponent = ({input, label, meta}) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    formSubmit(formProps) {
        console.log(formProps)
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.formSubmit)}>
                <Field name="title" component={this.inputComponent} label="Title"/>
                <Field name="description" component={this.inputComponent} label="Desc"/>
                <button className="ui button primary">Add</button>
            </form>
        ) 
    }
}

 export default reduxForm({
     form: 'createStreamForm',
     validate
 })(StreamCreate)
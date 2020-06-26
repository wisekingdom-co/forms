import { Row } from 'antd'
import * as React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FieldRenderProps } from '../types'


export interface ReCaptchaInputProps extends Partial<FieldRenderProps> {
    sitekey: string
}

export class ReCaptchaInput extends React.Component<ReCaptchaInputProps> {
    reCaptchaRef = React.createRef<ReCAPTCHA>()

    handleTokenChange = (recaptchaToken: any) => {
        const { form, field } = this.props
        this.setState({
            recaptchaToken,
        })
        form!.setFieldValue(field!.name, recaptchaToken)
    }

    render() {
        const {
            field,
            form,
            required,
            label,
            error,
            isError,
            dirty,
            hidden,
            help,
            disabled,
            options,
            children,
            componentProps,
            // tslint:disable-next-line: trailing-comma
            ...otherProps
        } = this.props
        return (
            <Row justify='center'>
                <ReCAPTCHA
                    {...componentProps}
                    {...otherProps}
                    sitekey={this.props.sitekey!}
                    ref={this.reCaptchaRef}
                    onChange={this.handleTokenChange}
                    size='normal' />
            </Row>
        )
    }
}

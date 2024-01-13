import React from "react"
import { connect } from "react-redux"
import { addFlashMessage } from "../../actions/flashMessageAction"
import withRouter from "../../withRouter"

export default function (WrappedComponent) {
    // console.log("function@");
    class Authenticate extends React.Component {

        componentDidMount() {
            const { isAuthenticated, navigate, addFlashMessage } = this.props
            if (!isAuthenticated) {
                addFlashMessage({
                    type: 'danger',
                    text: '请登录'
                })
            }
        }
        render() {
            // console.log("authenticate render@");
            return <WrappedComponent {...this.props} />
        }
    }
    const mapStateToProps = (state) => {
        // console.log("mapStateToProps@");
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return withRouter(connect(mapStateToProps, { addFlashMessage })(Authenticate))
}


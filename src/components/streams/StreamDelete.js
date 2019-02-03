import React from 'react';
import Modal from '../../Modal'
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    }
    renderActions() {
        //const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button
                    onClick={this.onDelete} 
                    className='ui button negative'
                >Delete</button>
                <Link to='/' className='ui button'>Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return <div>Are you sure you want to delete this stream?</div>
        }
        return (
            <div>{`Are you sure you want to delete this stream with:
                    title:${this.props.stream.title} and 
                    description: ${this.props.stream.description}`}</div>
        );
    }
    render() {
        return (
            <Modal
                title='Delete stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
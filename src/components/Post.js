import React, { Component } from 'react'
import { setVote, getPostById, getPostsCommentsById, addComment, deleteComment, editComment,editPost } from '../actions/postsAction'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment/min/moment-with-locales'
import 'moment-timezone'
import Ionicon from 'react-ionicons'
import Modal from 'react-modal'
import uuidv1 from 'uuid/v1'
import serializeform from 'form-serialize'

// Sets the moment instance to use.
Moment.globalMoment = moment;
 
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'pt-BR';
 
// Set the output format for every react-moment instance.
Moment.globalFormat = 'DD MMM YYYY HH:MM:SS';
 
// Use a <span> tag for every react-moment instance.
Moment.globalElement = 'span';

class Post extends Component{
    

    componentWillMount(){
        this.props.getPostById(this.props.match.params.id)
        Modal.setAppElement('body')
        // this.props.getPostsCommentsById(this.props.match.params.id)
    }

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            postModalIsOpen: false,
            isEdit: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openPostModal = this.openPostModal.bind(this);
        this.closePostModal = this.closePostModal.bind(this);
    }

    openPostModal() {
        this.setState({postModalIsOpen: true});
      }
    
      closePostModal() {
        this.setState({postModalIsOpen: false});
      }
    
      openModal(isEdit = false, comment) {
        this.setState({modalIsOpen: true, isEdit, comment});
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }


    setVote(id, option){
        this.props.setVote(id, option)
    }

    deleteComment(id){
        this.props.deleteComment(id)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeform(e.target, { hash: true }) 
        if(this.state.isEdit == true){
            this.props.editComment(values)
        }else{
            this.props.addComment(values)
        }
        this.closeModal()
    }

    handleSubmitPost = (e) => {
        e.preventDefault()
        const values = serializeform(e.target, { hash: true }) 
        this.props.editPost(values)
        this.closePostModal()
    }

    render(){
        console.log(this.props)
        const { loading, loadingC, post, comments } = this.props

        return(
            <section className="section-features">
            { loading === true ? <div>loading...</div> : 
                <section className="section-features">
                    <Modal
                        isOpen={this.state.postModalIsOpen}
                        onRequestClose={this.closePostModal}
                        >
                        <Ionicon icon="ios-close-circle" fontSize="35px" onClick={() => this.closePostModal()} color="black" style={{cursor: 'pointer'}}/>
                        <h2>Post</h2>
                        <form onSubmit={this.handleSubmitPost} className="contact-form">
                            <input type="hidden" value={post.id} name="id"/> 
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label htmlFor="title">Title</label>
                                </div>  
                                <div className="col span-2-of-3">
                                    <input type="text" name="title" id="title" placeholder="Title" defaultValue={post.title} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label htmlFor="body">Comment</label>
                                </div>
                                <div className="col span-2-of-3">
                                    <input type="text" name="body" id="body" placeholder="Comment" defaultValue={post.body} required />
                                </div>
                            </div>                        
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label>&nbsp;</label>
                                </div>
                                <div className="col span-1-of-3">
                                    <input type="submit" value="Salvar" />
                                </div>                    
                            </div>
                        </form>
                    </Modal>  
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        >
                        <Ionicon icon="ios-close-circle" fontSize="35px" onClick={() => this.closeModal()} color="black" style={{cursor: 'pointer'}}/>
                        <h2>Comment</h2>
                        <form onSubmit={this.handleSubmit} className="contact-form">
                            {this.state.isEdit === true ? 
                                (
                                    <div>
                                        <input type="hidden" value={this.state.comment.id} name="id"/> 
                                    </div>
                                ) : <input type="hidden" value={uuidv1()} name="id"/> 
                            }
                            <input type="hidden" value={post.id} name="parentId"/> 
                            <input type="hidden" value={Date.now()} name="timestamp"/>
                            
                            {this.state.isEdit === true ? <div className="row" /> :
                                <div className="row">
                                    <div className="col span-1-of-3">
                                        <label htmlFor="author">Author</label>
                                    </div>  
                                    <div className="col span-2-of-3">
                                        <input type="text" name="author" id="author" placeholder="Author" required />
                                    </div>
                                </div>
                            }
                        
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label htmlFor="body">Comment</label>
                                </div>
                                <div className="col span-2-of-3">
                                    <input type="text" name="body" id="body" placeholder="Comment" defaultValue={this.state.isEdit === true ? this.state.comment.body : ''} required />
                                </div>
                            </div>                        
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label>&nbsp;</label>
                                </div>
                                <div className="col span-1-of-3">
                                    <input type="submit" value="Salvar" />
                                </div>                    
                            </div>
                        </form>
                    </Modal>            
                    <div className="row">
                        <h2>{post.title}</h2>
                        <p className="long-copy">
                            {post.body}<Ionicon icon="ios-create" fontSize="17px" onClick={() => this.openPostModal()} color="black" style={{cursor: 'pointer'}}/>
                        </p>
                        <p className="long-copy-small">
                            Author: {post.author}
                        </p>
                        <p className="long-copy-small">
                            Date:  <Moment locale="br">{post.timestamp}</Moment>
                        </p>
                        <p className="long-copy-small">
                            Score: {post.voteScore} &nbsp;<Ionicon icon="ios-add-circle" fontSize="17px" onClick={() => this.setVote(post.id, 'upVote')} color="black"/><Ionicon icon="ios-remove-circle" fontSize="17px" onClick={() => this.setVote(post.id, 'downVote')} color="black"/>
                        </p>
                        <div className="long-copy-small">
                            <div style={{cursor: 'pointer'}} onClick={this.openModal}>Add Comment</div>
                        </div>
                    </div>
                    { loadingC === true ? <div>loading comments...</div> :
                        comments.map((comment) => {
                            return(
                                <div className="row" key={comment.id}>
                                    <p>&nbsp;</p>
                                    <div className="row">
                                        <Ionicon icon="ios-close-circle" fontSize="17px" onClick={() => this.deleteComment(comment.id)} color="black" style={{cursor: 'pointer'}} className="long-copy-small"/>
                                        <Ionicon icon="ios-create" fontSize="17px" onClick={() => this.openModal(true, comment)} color="black" style={{cursor: 'pointer'}}/>
                                        <p className="long-copy">{comment.body}</p>
                                        <p className="long-copy-small">
                                            Author: {post.author}
                                        </p>
                                        <p className="long-copy-small">
                                            Date:  <Moment locale="br">{post.timestamp}</Moment>
                                        </p>
                                        <p className="long-copy-small">
                                            Score: {comment.voteScore}
                                        </p>
                                    </div>                          
                                </div>
                            )
                        })
                    }
                    </section> 
            }
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.postReducer.post,
        loading: state.postReducer.loading,
        comments: state.postReducer.comments,
        loadingC: state.postReducer.loadingC
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (values) => dispatch(editPost(values)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        editComment: (values) => dispatch(editComment(values)),
        addComment: (values) => dispatch(addComment(values)),
        getPostById: (category) => dispatch(getPostById(category)),
        getPostsCommentsById: (id) => dispatch(getPostsCommentsById(id)),
        setVote: (id, option) => dispatch(setVote(id, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
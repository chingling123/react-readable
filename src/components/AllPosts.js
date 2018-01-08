import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getPostsByCategory, getAllData, setVote, editPost, addPost } from '../actions/postsAction'
import { connect } from 'react-redux'
import { voteCompare, dateCompare } from '../utils/generalUtils'
import Ionicon from 'react-ionicons'
import Modal from 'react-modal'
import uuidv1 from 'uuid/v1'
import serializeform from 'form-serialize'

class AllPosts extends Component{

    constructor() {
        super();

        this.state = {
            postModalIsOpen: false,
            isEdit: false
        };

        this.openPostModal = this.openPostModal.bind(this);
        this.closePostModal = this.closePostModal.bind(this);
    }

    openPostModal(isEdit = false) {
        this.setState({postModalIsOpen: true, isEdit});
      }
    
      closePostModal() {
        this.setState({postModalIsOpen: false});
      }


    componentWillMount(){
        this.props.getAllData()
        Modal.setAppElement('body')
    }

    changeCategory(name){
        if(name === 'All'){
            this.props.getAllPosts()
        }else{
            this.props.getPostsByCategory(name)
        }
        
    }

    setVote(id, option){
        this.props.setVote(id, option)
    }

    changeSort(type) {
        if(type === 'Score'){
            this.setState( { allPosts: this.props.allPosts.sort(voteCompare)} )
            
        }else{
            this.setState( { allPosts: this.props.allPosts.sort(dateCompare)} )
        }
    }

    handleSubmitPost = (e) => {
        e.preventDefault()
        const values = serializeform(e.target, { hash: true }) 
        if(this.state.isEdit === true){
            this.props.editPost(values)
        }else{
            this.props.addPost(values)
        }
        
        this.closePostModal()
    }

    render(){
        const { loading, loadingC, allPosts, allCategories } = this.props
        
        console.log('posts:', loading)
        console.log('categoria:',loadingC)
        return(
            <div>
                <Modal
                        isOpen={this.state.postModalIsOpen}
                        onRequestClose={this.closePostModal}
                        >
                        <Ionicon icon="ios-close-circle" fontSize="35px" onClick={() => this.closePostModal()} color="black" style={{cursor: 'pointer'}}/>
                        <h2>Post</h2>
                        <form onSubmit={this.handleSubmitPost} className="contact-form">
                            
                            <input type="hidden" value={uuidv1()} name="id"/> 
                            
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label htmlFor="title">Title</label>
                                </div>  
                                <div className="col span-2-of-3">
                                    <input type="text" name="title" id="title" placeholder="Title" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col span-1-of-3">
                                    <label htmlFor="body">Body</label>
                                </div>
                                <div className="col span-2-of-3">
                                    <input type="text" name="body" id="body" placeholder="Body" required />
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
                <header>
                <nav>
                    <div className="row">
                        <p className="logo">Categories:</p>
                        <ul className="main-nav">
                        { loadingC === true ? <li>loading</li> : <div>{allCategories.map((item) => {
                                return <li key={item.name} onClick={() => this.changeCategory(item.name)} style={{cursor: 'pointer'}}>{item.name}</li>
                                })}<li key='All' onClick={() => this.changeCategory('All')} style={{cursor: 'pointer'}}>All</li></div>
                        }
                        </ul>
                    </div>
                    <div className="row">
                        <p className="logo">Sort:</p>
                        <ul className="main-nav">
                            <li onClick={() => this.changeSort('Score')} style={{cursor: 'pointer'}}>Score</li>
                            <li onClick={() => this.changeSort('Date')} style={{cursor: 'pointer'}}>Date</li>
                        </ul>
                    </div>              
                </nav>
                </header>
                <section className="section-posts">
                    <div className="row">
                        New Post:&nbsp;<Ionicon icon="ios-add-circle" fontSize="34px" onClick={() => this.openPostModal()} color="black" style={{cursor: 'pointer'}}/>
                    </div>     
                    <div className="row">
                        &nbsp;
                    </div>
                { loading === true ? <div className="row">loading</div> : <div className="row">{
                    allPosts.map((item) => {
                        return  (
                                <div className="col span-1-of-3" key={item.id}>
                                    <div className="posts-box">
                                        <div>
                                            <h3><Link to={`/post/${item.id}`}>{item.title}</Link></h3>
                                            <p className="posts-category"><span>{item.category}</span></p>
                                            <p className="posts-body">{item.body}</p>
                                            <div>
                                                <p className="posts-vote">Score: {item.voteScore}</p><div><Ionicon icon="ios-add-circle" fontSize="35px" onClick={() => this.setVote(item.id, 'upVote')} color="black"/><Ionicon icon="ios-remove-circle" fontSize="35px" onClick={() => this.setVote(item.id, 'downVote')} color="black"/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                </section>
            </div>
        )
    }

}    
                   

const mapStateToProps = (state) => {
    return {
        allCategories: state.categoriesReducer.allCategories,
        allPosts: state.postsReducer.allPosts,
        loading: state.postsReducer.loading,
        loadingC: state.categoriesReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (values) => dispatch(addPost(values)),
        editPost: (values) => dispatch(editPost(values)),
        getAllData: () => dispatch(getAllData()),
        getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
        getAllPosts: () => dispatch(getAllPosts()),
        setVote: (id, option) => dispatch(setVote(id, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)

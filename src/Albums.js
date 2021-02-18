import React from 'react';
import axios from 'axios';

export default class Albums extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      users: [],
	      albums: [],
	      photos: [],
	      userId: 0,
	      albumId: 0,
	      photoId: 0,
	      previewAlbumId: 0,
	    };
	    this._handleBackToHome = this._handleBackToHome.bind(this);
	    this._handleBackToAlbum = this._handleBackToAlbum.bind(this);
	    this._handleClosePhoto = this._handleClosePhoto.bind(this);
	    this._handlePhotoToLeft = this._handlePhotoToLeft.bind(this);
	    this._handlePhotoToRight = this._handlePhotoToRight.bind(this);
	  }
	  
	    componentDidMount() {
	    	   const urlUsers= 'https://jsonplaceholder.typicode.com/users';
	    	   const urlAlbums= 'https://jsonplaceholder.typicode.com/albums';
	    	   const urlPhotos= 'https://jsonplaceholder.typicode.com/photos';

	    	    axios(urlUsers).then(result => {
	    	        this.setState({ users: result.data })
	    	    }, this)
	    	    
	    	    axios(urlAlbums).then(result => {
	    	        this.setState({ albums: result.data })
	    	    }, this)
	    	    
	    	    axios(urlPhotos).then(result => {
	    	        this.setState({ photos: result.data })
	    	    }, this)
	    }

	  render() {
   	   const { users } = this.state;
       const { albums } = this.state;
       const { photos } = this.state;
       const { userId } = this.state;
       const { albumId } = this.state;
       const { photoId } = this.state;
   	   let that = this;
   	   
	   return ( <div>
	     <button className="title"
	    		 onClick = { this._handleBackToHome }>
	        <span className='title-text'>
	    	   { 'Gallery' }
	    	</span>
	     </button>
	     <div className='main-albums'>
	     { userId === 0 && albumId === 0 ? <div>
           {users.map(function (item, i, array) {
            return <button key={ item.id} 
                     className='button-author'
                     onClick = { () => that._handleSelectAuthor(i) }>        
                      { item.name } 
              </button>
            })} 
          </div> : null }
	     { userId > 0 ?  
           <button className="title title-user-name"
        		   onClick = { this._handleBackToAlbum }>
             <span className='title-text title-user-name-text'>
               { users[userId - 1].name }
             </span>
           </button> : null }
  	     { userId > 0 && albumId === 0 ?  
  	      <div>
           {albums.map(function (item, i, array) {
              return <div key={ item.id}
                        className='button-album-item' >
               { userId === item.userId ?  
                 <button  
                      className='button-author button-album'
                       onClick = { () => that._handleSelectAlbum(i) }>   
                       <img 
                        className='button-album-preview' 
                         src={ item.previewUrl }/>
                         <div className='button-album-name'>
                           { item.title }
                         </div>
                         <div className='button-album-name'>
                            {'('} { item.length }{')'}
                         </div>
                 </button> : null }
              </div>
           })} 
          </div>
	      : null }
  	     { userId > 0 && albumId > 0 ?  
  	   	    <div>
  	         {photos.map(function (item, i, array) {
  	           return <div key={ item.id}
  	                      className='button-album-item' >
  	                { albumId === item.albumId ?  
  	                  <button  
  	                    className='button-author button-album'
  	                        onClick = { () => that._handleSelectPhoto(i) }>   
  	                     <img 
  	                       className='button-album-preview' 
  	                         src={ item.thumbnailUrl }/>
  	                  </button> : null }
  	               </div>
  	           })} 
  	         </div>
  	 	   : null }
           { userId > 0 && albumId > 0 && photoId > 0 ?
              <dialog 
                 open
                 className='album-dialog'>
	             <img 
                   src='move_icon.png' 
        	       className='album-photo-move-left'
        	       onClick={ this._handlePhotoToLeft }/>
	             <img 
                    src='move_icon.png' 
      	            className='album-photo-move-left album-photo-move-right'
      	            onClick={ this._handlePhotoToRight }/>
	             <img 
     	              src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' 
     	        	  className='album-photo-close'
     	        	  onClick={ this._handleClosePhoto }/>
                 <img
                     className='album-photo'
                     src={ photos[photoId - 1].url }
                     onClick={this._handlePhotoToRight}
                   />
              </dialog> : null }
	     </div>
	    </div>
	    );
	  }
	  
	  _handleSelectAuthor(index) {
		  var users = this.state.users;
		  var albums = this.state.albums;
		  var photos = this.state.photos;
		  var userId = users[index].id;
		  this.setState({ userId: userId });
		  let albumId;
		  let albumLength = 0;
		  albums.forEach(function(item, i, array) {
      	    if (item.userId === userId) {
      	      let previewUrl;
      	      albumId = i + 1;
      	      photos.forEach(function(photo, indx, array) {
            	 if (photo.albumId === albumId) {
            		 previewUrl = photo.thumbnailUrl;
            		 albumLength++;
            	 }
              });
      	     albums[i].previewUrl = previewUrl;
      	     albums[i].length = albumLength;
      	     albumLength = 0;
      	    }
          });
		  this.setState({ albums: albums });
	  }
	  
	  _handleSelectAlbum(index) {
		  var albums = this.state.albums;
		  this.setState({ albumId: albums[index].id });

	  }
	  
	  _handleSelectPhoto(index) {
		  var photos = this.state.photos;
		  this.setState({ photoId: photos[index].id });

	  }
	  
	  _handlePhotoToLeft() {
		  var photos = this.state.photos;
		  var photoId = this.state.photoId;
		  var albumId = this.state.albumId;

		  if (photos[photoId - 2] && photos[photoId - 2].albumId === albumId) {
			  this.setState({ photoId: (photoId - 1)});
		  }

	  }
	  
	  _handlePhotoToRight() {
		  var photos = this.state.photos;
		  var photoId = this.state.photoId;
		  var albumId = this.state.albumId;

		  if (photos[photoId] && photos[photoId].albumId === albumId) {
			  this.setState({ photoId: (photoId + 1)});
		  }

	  }
	  
	  _handleBackToHome() {
		  this.setState({ userId: 0 });
		  this.setState({ albumId: 0 });
		  this.setState({ photoId: 0 });
	  }
	  
	  _handleBackToAlbum() {
		  this.setState({ albumId: 0 });
		  this.setState({ photoId: 0 });
	  }
	  
	  _handleClosePhoto() {
		  this.setState({ photoId: 0 });
	  }
}
	
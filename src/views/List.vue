<template>
    <div>
        <div class="modal fade" id="editor" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="username">Title</label>
                            <input type="text" id="username" class="form-control" v-model="editcomment.name">
                        </div>
                        <div class="form-group">
                            <label for="comment">Comment</label>
                            <textarea class="form-control" id="comment" rows="5" v-model="editcomment.body"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editComment">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="deleting" tabindex="-10" role="dialog" aria-labelledby="deleteLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="username">Title</label>
                            <input type="text" id="username" class="form-control" v-model="editcomment.name" disabled>
                        </div>
                        <div class="form-group">
                            <label for="comment">Comment</label>
                            <textarea class="form-control" id="comment" rows="5" v-model="editcomment.body" disabled></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteComment">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="text-center">This is a comment list. Feel free to try.</h4>
                    <div class="form-group">
                        <label for="title">Email*</label>
                        <input type="email" id="title" class="form-control" v-model="setcomment.email">
                    </div>
                    <div class="form-group">
                        <label for="username">Title</label>
                        <input type="text" id="username" class="form-control" v-model="setcomment.name">
                    </div>
                    <div class="form-group">
                        <label for="comment">Comment*</label>
                        <textarea class="form-control" id="comment" rows="3" v-model="setcomment.body"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary text-center mr-3" @click="createComment">Submit</button>
                    <small>*All Fields Required</small>
                </div>
            </div>
            <br>
            <h5>Comment List</h5>
            <div class="row">
                <div class="col-md-12">
                    <div class="list-group" v-for="(item, index) in list" :key="index">
                        <div class="list-group-item flex-column align-items-start mb-3">
                            <div class="d-flex w-100 justify-content-between">
                                <p>{{ item.name }}</p>
                                <small>
                                    <button type="button" class="btn btn-primary btn-sm mr-3" data-toggle="modal" data-target="#editor" @click="goedit(index)">Edit</button>
                                    <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleting" @click="godelete(index)">Delete</button>
                                </small>
                            </div>
                            <p class="mb-1">{{ item.body }}</p>
                            <small>{{ item.email }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.getlist()
    },
    data() {
        return {
            list: [],
            setcomment: {
                postId: 1,
                id: 1,
                name: "",
                email: "",
                body: ""
            },
            editcomment: {
                postId: 1,
                id: 1,
                name: "",
                email: "",
                body: ""
            }
        }
    },
    methods: {
        getlist: function() {
            fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then((response) => response.json()).then((json) => {
                this.list = json
            })
        },
        createComment: function() {
            var newid = this.list.length + 1
            this.setcomment.id = newid
            if(this.setcomment.name == "" && this.setcomment.email == "" && this.setcomment.body == "") {
                alert("Make sure all required fields are filled!")
            } else {
                fetch('https://jsonplaceholder.typicode.com/posts/1/comments', {
                    method: 'POST',
                    body: JSON.stringify(this.setcomment),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }).then((response) => response.json()).then((json) => {
                    this.setcomment = {
                        postId: 1,
                        id: 1,
                        name: "",
                        email: "",
                        body: ""
                    }
                    this.getlist()
                    alert("Your comment has been posted.")
                    console.log(json)
                }).catch(err => {
                    alert("Your comment has failed to post!")
                    console.log(err)
                })
            }
        },
        goedit(index) {
            fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then((response) => response.json()).then((json) => {
                this.editcomment = json[index]
            })
        },
        godelete(index) {
            fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then((response) => response.json()).then((json) => {
                this.editcomment = json[index]
            })
        },
        editComment: function() {
            fetch('https://jsonplaceholder.typicode.com/posts/1/comments', {
                method: 'PUT',
                body: JSON.stringify(this.editcomment),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((response) => response.json()).then(() => {
                alert("The comment has been edited.")
                console.log(this.list)
            }).catch(err => {
                alert("The comment has failed to edit!")
                console.log(err)
            })
        },
        deleteComment() {
            if(confirm("Are you sure do you want to delete the selected comment ?")) {
                fetch('https://jsonplaceholder.typicode.com/posts/1/comments?id=' + this.editcomment.id, {
                    method: 'DELETE'
                }).then((response) => response.json()).then(() => {
                    this.getlist()
                    alert("The selected comment has been deleted.")
                }).catch(err => {
                    alert("Comment has failed to delete!")
                    console.log(err)
                })
            }
        }
    }
}

</script>
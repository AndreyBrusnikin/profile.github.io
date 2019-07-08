const ItemInfo = Vue.component('item-info', {
    props: {
      value:{},
    },
    data: function () {
      return {
        files:[],
      }
    },
    methods: {
      availiable: function () {
        console.log(this.files);
      },
    },
    mounted: function(){
      this.files = this.value.files;
  
    },
    template:
        `<div class="list-holder">
                  <div class="title-list">{{value.name}}</div>            
                  <ul class="list-item">            
                      <item-list v-for="file in files" v-model='file'></item-list>            
                  </ul>            
        </div>`
  });
  
  const ItemList = Vue.component('item-list', {
    name: 'item-list',
    props: {
      value:{},
  
    },
    data: function () {
      return {
        isActive: false,
      }
    },
    methods: {
      seen: function () {
  
        if(this.value.seen === false){
          this.isActive = true;
        }
        else{
          this.isActive = false;
        }
      },
  
    },
    mounted: function(){
      this.source = this.value.source;
      this.seen();
    },
    template:
        `         
       <li v-bind:class='{ active: isActive }'>
          <router-link :to="{name: 'item-list', params: {_id:this.value._id}}">{{value.name}}</router-link>
       </li>            
                          
       `
  });
  
  
  const WebinarComment = Vue.component('webinar-comment', {
    props: {
      value:{},
    },
    data: function () {
      return {
        date:"",
      }
    },
    mounted: function(){
      this.date = this.formatDate(this.value.time);
    },
    methods:{
      formatDate(time) {
        const date = new Date(Number(time));
        const months = [
          'янв',
          'фев',
          'март',
          'апр',
          'май',
          'июнь',
          'июль',
          'авг',
          'сен',
          'окт',
          'нояб',
          'дек',
        ];
  
        return `${date.getDay() + 1} ${months[date.getMonth()]} ${date.getYear() +
        1900}`;
      },
    },
    template:
    `<div class="comment-holder">
            <a href="https://www.w3schools.com/w3css/img_lights.jpg" rel="gallery1"   class="comment-image fancybox">
              <img  src="https://www.w3schools.com/w3css/img_lights.jpg" alt="">   
            </a>               
            <div class="comment">
                <div class="comment-date">
                    <b>{{value.name}}</b>                  
                    {{this.date}}                                   
                </div>                    
                <div class="comment-text">{{value.text}}</div>                  
            </div>
        </div>`
  });
  
  
  const CourseItem = Vue.component('course-item', {
    name: 'course-item',
    props: {
      value:{},
    },
    data: function () {
      return {
        show:false,
        computedHeight: 'auto',
        blocks:[],
        messages:[],
        isActive: true,
        showPost: true,
        image: '',
        load: true,
        source:"https://",
        id:0
      }
    },
  
    watch: {
      'value.available': function (availiable) {
       if(availiable === true){
         isActive = true;
       }
       else{
         isActive = false;
       }
      },
      '$route.params._id': function (video) {
          for(var i=0; i < this.value.blocks.length; i++){
            for(var j=0; j < this.value.blocks[i].files.length; j++){
              if( this.value.blocks[i].files[j]._id == video){
                this.source =  this.value.blocks[i].files[j].source;
              }
            }
          }
      }
    },
    methods: {
      availiable: function(){
        if(this.value.available === false){
  
          this.show = false;
        }
        else{
          this.show =! this.show;
          this.source =  this.value.blocks[0].files[0].source;
        }
      },
      fileSelected(evt) {
        var file = evt.target.files.item(0);
        var fileReader = new FileReader();
        fileReader.addEventListener('load', (event) => {
          this.image = event.target.result;
        });
        if (file != null){
          this.load = false;
        }
        fileReader.readAsDataURL(file);
      },
      initActive: function() {
        if (this.value.available === false) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      },
      postable: function() {
        if (this.value.postable === true) {
          this.showPost = false;
        } else {
          this.showPost = true;
        }
      },
    },
    mounted: function(){
      this.initActive();
      this.postable();
      this.blocks = this.value.blocks;
      this.messages = this.value.chat.messages;
    },
    template: `
             <div class="webinar-item-holder">
                <router-link @click.native="availiable()" :to="{ name: 'course-item', params: {id: this.value.id }}" class="webinar-item">
                    <div class="item-title">{{value.name}}</div>
                    <div class="item-dot" v-bind:class='{ active: isActive }'></div>
                </router-link>
                <transition name="slide">
                    <div class="item-info-holder" ref="collapse" v-show="show">
                        <div class="info-title">
                            Лайтинг &nbsp;
                            <div class="info-title-bold">VRay : Lighting by HDRI</div>
                        </div>
                        <div class="item-info">
                            <div class="item-info-left">
                                <div class="item-video">
                                <video id="my-video" class="video-js vjs-default-skin vjs-16-10 vjs-big-play-centered" controls preload="auto" data-setup='[ playbackRates: "[0.75, 1, 1.5, 2]",]' v-bind:src="this.source" type='video/mp4'>
                                  <source v-bind:src="this.source" type='video/mp4'>
                                </video>
                                </div>
               
                            </div>
                            <div class="item-info-right">
                                <item-info v-for='block in blocks' v-model='block'></item-info>
                            </div> 
                        </div>
                        <div class="webinar-comment-holder">
                             <webinar-comment v-for='message in messages' v-model='message' ></webinar-comment>
                             <div class="add-comment-holder" v-show="showPost">
                                  <form class="form-comment" method="POST" action="/profile/1#" id="commentAdd" enctype="multipart/form-data">
                                      <input type="file" @change="fileSelected" name="file" id="file" class="inputfile" />
                                        <label v-if="load" class="image-onload" for="file"></label>      
                                        <label v-else class="image-holder" for="file">
                                          <img class="add-image" :src="image">
                                        </label>
                                      <textarea placeholder="Добавить комментарий..." class='add-comment'></textarea>
                                      <button type="submit" class="add-homework">
                                          Добавить домашнюю работу
                                      </button>
                                  </form>
                             </div>
                        </div>
                    </div>
                </transition>
            </div>`
  });
  
  
  const routes = [
    {
      path: '/:id',
      name: 'course-item',
      component: CourseItem,
      children: [
        {
          path: '/:id/:_id',
          component: ItemList,
          name: 'item-list',
        },
        {
          path:'/',
          component: ItemInfo,
          name: 'item-info',
        },
        {
          path:'/',
          component: WebinarComment,
          name: 'webinar-comment',
        }
      ]
    },
  ]
  
  const router = new VueRouter({
    routes
  })
  
  
  
  
  new Vue({
    el: '#course',
    router,
    props: {
      source: [],
    },
    data: function () {
      return {
        items: [],
      }
    },
    methods: {
      load(){
        fetch('https://api.myjson.com/bins/u9y4v')
            .then(response => response.json())
            .then(data => {
              this.source = data.folds;
              this.items = this.source;
            });
      }
    },
    mounted: function(){
      this.load();
    },
  
  });
  
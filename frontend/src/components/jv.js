
    /*
    console.log("hello world");
    $(window).load(function(){
        var w = $(window).width()
        if(w<700){
            $('.home_section').addClass('.home_section_small')      
        }
    });

    $(window).resize(function(){

        var w = $(window).width()
        if(w<700){
            $('.home_section').addClass('.home_section_small')
        }
    });*/


/*
    function resizeTextarea(id) {
        var a = document.getElementById(id);
        
        a.style.height = 'auto';
        a.style.height = a.scrollHeight+'px';
      }
      
      function init() {
        var a = document.getElementsByTagName('textarea');
        
        for(var i=0,inb=a.length;i<inb;i++) {
           if(a[i].getAttribute('data-resizable')=='true') 
           resizeTextarea(a[i].id);
        }
      }
      addEventListener('DOMContentLoaded', init);*/
import $ from 'jquery';
    $(document).ready(function($){
    
        $("textarea").keypress(function (e) {
              if(e.which === 13 && !e.shiftKey) {        
                  //var val = $(this).closest('form').context.value
                  var show_comment = ($(this).closest('form').context.parentNode)
                  e.preventDefault();
                  var comment=$(this).closest('form').context         
    //              show_comment.previousElementSibling.previousElementSibling.className="show_comments"
                  $.ajax({
                      type:'POST',
                      url:'/comment/'+$(this).closest('form').context.previousElementSibling.id+'/',
                      data:{
                          comment:$(this).closest('form').context.value,
                          //photo_id:$(this).closest('form').context.previousElementSibling.id,
                          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()                        
                      },
                      success:function(e){
    
                          var html='<div class="_cmt_box _cmt"><span class="_uname"><a href="/user/'+e.uname+'  "><span style="color:black;font-weight:bold;margin-right:3/px;">'+e.uname+'<span></a><span class="_cmt">&nbsp'+e.comment+' :-</span><span class="_cmt_time" style="color:rgb(83, 83, 83);font-size:12px;font-weight:5;font-style:inherit;">'+e.date+'</span></span></div>'                
                          //show_comment.previousElementSibling.className="show_comments tmp"
                          if(show_comment.previousElementSibling.previousElementSibling)
                          {
                              show_comment.previousElementSibling.previousElementSibling.className="show_comments tmp"
                          }else{
                              show_comment.previousElementSibling.className="show_comments tmp"
                          }
                          //console.log(show_comment.previousElementSibling.previousElementSibling)
                          $('.tmp').append(html)
                          //$('.tmp').find('._cmt').slideUp("fast")
                          if(show_comment.previousElementSibling.previousElementSibling)
                          {
                              show_comment.previousElementSibling.previousElementSibling.className="show_comments"
                          }else{
                              show_comment.previousElementSibling.className="show_comments"
                          }    
    
                          //console.log(e.comment)
                          //show_comment.previousElementSibling.className="show_comments tmp"
                          //$('.tmp').append("<div>dsfdsfdf</div>"
                          //var js = $.parseJSON(e)   
                          //html='<div class="_cmt_box"><span class="_uname"><a href="/user/'+e.uname+'  "><span style="color:black;font-weight:bold;margin-right:3/px;">'+e.uname+'<span></a><span class="_cmt">&nbsp'+e.comment+' :-</span><span class="_cmt_time" style="color:rgb(83, 83, 83);font-size:12px;font-weight:5;font-style:inherit;">'+e.date+'</span></span></div>'
                          //$('.tmp').append(html)
                          //show_comment.previousElementSibling.className="show_comments"  
                          comment.value=""                              
                          //console.log(js)
    //                        show_comment.append(html)
                      }
                  })
                  return false;
              }
          });
    


      //var fix = $('.main').offset().top;
      //var fix = $('.main').offset()
      var fix = $('.main')
      $(window).scroll(function(){

          var currentScroll = $(window).scrollTop();
          if(currentScroll>=fix){
              $('.left-content').addClass('fix_side')
              $('.right-content').addClass('fix_side')
          }
          else{
              $('.left-content').removeClass('fix_side')
              $('.right-content').removeClass('fix_side')
          }
      })

      var alterClass = function() {
        var ww = document.body.clientWidth;
        if (ww < 1100) {
          $('.home_section').addClass('home_section_small');
          $('.left').hide()
          $('.right').hide()
        } else if (ww > 1100) {
            
          $('.home_section').removeClass('home_section_small');
          $('.left').show()
          $('.right').show()
        };
      };

      var border_class = function() {
          var ww = document.body.clientWidth;
          if (ww < 600) {
              
            $('.article').addClass('border');
            //$('.left').hide()
            //$('.right').hide()
          } else if (ww > 600) {
              
            $('.article').removeClass('border');
            //$('.left').show()
            //$('.right').show()
          };
        };



      $(window).resize(function(){
        alterClass();
        border_class();
      });
      //Fire it when the page first loads:
      alterClass();
      border_class();
    });

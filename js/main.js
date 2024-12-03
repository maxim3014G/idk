

$(function(){
    
    
    
    
    
  $(window).scroll(function(){
    
    var divOffset = $('#nav-item').offset();
       
    hasNotReachedIt = true;
      
    if(window.scrollY > divOffset.top && hasNotReachedIt){

       $('#navv').fadeOut(300);        
        hasNotReachedIt = false;     
    }
      
    if(window.scrollY < divOffset.top){

       $('#navv').fadeIn(300);
        
        console.log('you are above me');
        hasNotReachedIt = false;
        
    }

 })
 
 
 
 
})
$(document).ready(function(){
    var ks_head = $("body");
    var ks_script = $(`<script type='text/javascript'> var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); (function(){var s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0]; s1.async=true; s1.src='https://embed.tawk.to/5dc9267f43be710e1d1cb17f/default'; s1.charset='UTF-8'; s1.setAttribute('crossorigin','*'); s0.parentNode.insertBefore(s1,s0); })(); </script>`)
    if ($(window).width() > 660){
        ks_head.after(ks_script);
    }
})
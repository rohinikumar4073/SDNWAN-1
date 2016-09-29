define(function(){
	var flag=false;
    return {
        setFlag: function(booleanValue){
        	flag=booleanValue;
        	
        },
        getFlag:function(){
        	return flag;
        }
       
    };
});
define(function(){
	var flag=false;
    return {
        setFlag: function(booleanValue){
        	$(".n-topology-tooltip").hide()
        	flag=booleanValue;

        },
				setFlagNoHide: function(booleanValue){
					flag=booleanValue;
				},
        getFlag:function(){
        	return flag;
        }
}
});

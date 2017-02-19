define(function(){
	var flag=false;
	var virtualFlag=false;
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
        },
				getVirtualFlag:function(){
					return virtualFlag;
				},
				setVirtualFlag:function(booleanValue){
					virtualFlag=booleanValue;
				}
}
});

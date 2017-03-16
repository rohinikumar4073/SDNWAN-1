define(function(){
	var flag=false;
	var virtualFlag=false;
	var dynamicFlag=false;
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
				},
				getDynamicFlag:function(){
					return dynamicFlag;
				},
				setDynamicFlag:function(booleanValue){
					dynamicFlag=booleanValue;
				}

}
});

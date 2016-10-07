define(['react'], function(React) {
 
  var FBOSData = React.createClass({

 
    render: function() {


      return (
  <div id="accordion">
  <div class="panel-group">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" href="#collapse1">Template Information</a>
        </h4>
      </div>
      <div id="collapse1" class="panel-collapse collapse">
        <div class="panel-body">
  <form>
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" class="form-control" id="name">
  </div>
  <div class="form-group">
    <label for="revision">Revision:</label>
    <input type="text" class="form-control" id="revision">
  </div>
<div class="form-group">
    <label for="lastUpdatedBy">Last Updated By:</label>
    <input type="text" class="form-control" id="lastUpdatedBy">
  </div>
<div class="form-group">
    <label for="timestamp">Time Stamp:</label>
    <input type="text" class="form-control" id="timestamp">
  </div>
  <div class="form-group">
    <label for="status">Status:</label>
    	 <div class="radio">
  <label><input type="radio" name="status">Draft</label>
</div>
<div class="radio">
  <label><input type="radio" name="status">Available</label>
</div>
<div class="radio">
  <label><input type="radio" name="status">Decommissioned</label>
</div>
  </div>
  <div class="form-group">
    <label for="templateCategory">Template Category:</label>
    <input type="text" class="form-control" id="templateCategory">
  </div>
  
  
</form>
</div>
</div>
</div>
</div>



<div class="form-group">
    <label for="osIdentifier">OS Identifier/Label:</label>
    <input type="text" class="form-control" id="osIdentifier">
  </div>
<div class="form-group">
    <label for="manufacturer">Manufacturer:</label>
    <input type="text" class="form-control" id="manufacturer">
  </div>
  <div class="form-group">
    <label for="version">Version:</label>
    <input type="text" class="form-control" id="version">
  </div>
   <div class="form-group">
    <label for="imageFileName">Image File Name:</label>
    <input type="text" class="form-control" id="imageFileName">
  </div>
  
    <div class="form-group">
    <label for="orderablePartNumber">Orderable Part Number:</label>
    <input type="text" class="form-control" id="orderablePartNumber">
  </div>
  
    <div class="form-group">
    <label for="description">Description:</label>
    <input type="text" class="form-control" id="description">
  </div>

    <div class="form-group">
    <label for="materialId">Material ID (from Vz procurement system):</label>
    <input type="text" class="form-control" id="materialId">
  </div>
      <div class="form-group">
    <label for="openFlowVersion">OpenFlow Protocol Version(s) Supported:</label>
    	 <div class="radio">
  <label><input type="radio" name="openFlowVersion">1.3</label>
</div>
<div class="radio">
  <label><input type="radio" name="openFlowVersion">1.5</label>
</div>
  </div>
  
      <div class="form-group">
    <label for="linuxVersion">Linux kernel version:</label>
    <input type="text" class="form-control" id="linuxVersion">
  </div>
  
      <div class="form-group">
    <label for="linuxBase">Linux Distribution base:</label>
    <input type="text" class="form-control" id="linuxBase">
  </div>
  
  
  
    <div class="panel-group">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" href="#collapse2"> OS Configuration</a>
        </h4>
      </div>
      <div id="collapse2" class="panel-collapse collapse">
        <div class="panel-body">
  <form>
<div class="form-group">
    <label for="enableArp">Enable Local ARP Response Processing:</label>
    	 <div class="radio">
  <label><input type="radio" name="enableArp">True</label>
</div>
<div class="radio">
  <label><input type="radio" name="enableArp">False</label>
</div>

  </div>
  <div class="form-group">
    <label for="localArp">Local ARP Response Subnet Coverage:</label>
    <input type="text" class="form-control" id="localArp">
  </div>

<div class="form-group">
    <label for="enableNd">Enable Local IPv6 ND Response Processing:</label>
    	 <div class="radio">
  <label><input type="radio" name="enableNd">True</label>
</div>
<div class="radio">
  <label><input type="radio" name="enableNd">False</label>
</div>
</div>

  <div class="form-group">
    <label for="localIpv6">Local IPv6 ND Response Subnet Coverage:</label>
    <input type="text" class="form-control" id="localIpv6">
  </div>


<div class="form-group">
    <label for="queryInterval">FB & SFP Inventory Query Interval(sec):</label>
    <input type="text" class="form-control" id="queryInterval">
  </div>
  
  <div class="form-group">
    <label for="interfaceInterval">Interface and Flow Counter Query Interval(sec):</label>
    <input type="text" class="form-control" id="interfaceInterval">
  </div>

 <div class="form-group">
    <label for="alarmHistory">Alarm History:</label>
       	 <div class="radio">
  <label><input type="radio" name="alarmHistory">Enabled</label>
</div>
<div class="radio">
  <label><input type="radio" name="alarmHistory">Disabled</label>
</div>
</div>
 
 <div class="form-group">
    <label for="alarmHigh">Alarm High Temperature(F Degrees):</label>
    <input type="text" class="form-control" id="alarmHigh">
  </div>
 <div class="form-group">
    <label for="alarmLow">Alarm Low Temperature(F Degrees):</label>
    <input type="text" class="form-control" id="alarmLow">
  </div>
 <div class="form-group">
    <label for="puppet">Puppet Agent Utilized:</label>
    	 <div class="radio">
  <label><input type="radio" name="puppet">True</label>
</div>
<div class="radio">
  <label><input type="radio" name="puppet">False</label>
</div>
  </div>
  
  
</form>
</div>
</div>
</div>
</div>
  
   
  

  </div>
  
  </div>

  
  
  </div>
  )

   }
    });
  return FBOSData;


    });

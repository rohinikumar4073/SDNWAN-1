define(['react'], function(React) {
 
  var FBTranseiverData = React.createClass({

 
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
    <label for="manufacturer">Manufacturer:</label>
    <input type="text" class="form-control" id="manufacturer">
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
    <label for="supplier">Supplier:</label>
    <input type="text" class="form-control" id="supplier">
  </div>

   <div class="form-group">
    <label for="supplierNo">Supplier Part Number:</label>
    <input type="text" class="form-control" id="supplierNo">
  </div>
  
    <div class="form-group">
    <label for="clei">CLEI:</label>
    <input type="text" class="form-control" id="clei">
  </div>
  
    <div class="form-group">
    <label for="materialId">Material ID (from Vz procurement system):</label>
    <input type="text" class="form-control" id="materialId">
  </div>


  

  </div>
  
)

   }
    });
  return FBTranseiverData;


    });
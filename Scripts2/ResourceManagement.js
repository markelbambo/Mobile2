/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadReserve
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 1
 *  #  DESCRIPTION   : load reservation reserve table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadReserve(){
	var limit = $('#ResourceManagementPageLimit').val();
	var page = $('#RMPageNumber').text();
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}
	var url ='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationReserve&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"","start":"","status":"","timezone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}&version="3.0"';
	if(globalDeviceType == "Mobile"){
		loading('show');
	}else{
		$("#reservationRM-table > tbody").empty().append(loader);
	}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var tableClass = "";
            var html ='',startRes='',endRes='';
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesReserved').html(json.root[0].total);
			}else{
				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
			}
			if(json.root[0].total == 0){
				html += "<tr><td colspan='19'>No available data.</td></tr>";
				$("#reservationRM-table > tbody").empty().append(html);
				return;
			}
// This part is for parsing the table content
            for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
//MOBILE
				html += "<tr class='trReserved "+tableClass+"' devId='"+json.root[0].row[a].DeviceId+"' rIds='"+json.root[0].row[a].ResourceId+"' uId='"+json.root[0].row[a].DeviceReservationUserId+"' rId='"+json.root[0].row[a].ResourceId + json.root[0].row[a].DeviceReservationUserId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' class='resres' iter='"+json.root[0].row[a].Recurrence+"' rIds='"+json.root[0].row[a].ResourceId+"' uId='"+json.root[0].row[a].DeviceReservationUserId+"' rId='"+json.root[0].row[a].ResourceId + json.root[0].row[a].DeviceReservationUserId+"' did='"+json.root[0].row[a].DeviceId+"' did2='"+json.root[0].row[a].DeviceId+"_"+json.root[0].row[a].ResourceId+"' id='ReservationReserve_"+json.root[0].row[a].DeviceId+"_"+json.root[0].row[a].ResourceId+"' name='ReservationReserveSel' onclick='checkSingleRM(\"ReservationReserve\",this);'/></td>";
				}

				if(globalDeviceType == "Mobile"){

					loading('hide');
					html += "<td>"+json.root[0].row[a].DeviceId+"</td>";
					html += "<td>"+json.root[0].row[a].QueueTime+"</td>";
					html += "<td>"+json.root[0].row[a].HostName+"</td>";
					html += "<td>"+json.root[0].row[a].DomainName+"</td>";
					html += "<td>"+json.root[0].row[a].ManagementIp+"</td>";
					html += "<td>"+json.root[0].row[a].ConsoleIp+"</td>";
					html += "<td>"+json.root[0].row[a].Model+"</td>";
					var startRes = json.root[0].row[a].StartReservation.split(" ");
					html += "<td>"+startRes[0]+"</td>";
					html += "<td>"+startRes[1]+"</td>";
        	        html += "<td>"+json.root[0].row[a].DeviceReservationUserId+"</td>";
					html += "<td>"+json.root[0].row[a].UserDomainName+"</td>";
					html += "<td>"+json.root[0].row[a].ReservedFrom+"</td>";
					html += "<td>"+json.root[0].row[a].TimeInterval+"</td>";
    		        html += "<td>"+json.root[0].row[a].Recurrence+"</td>";
					html += "<td>"+json.root[0].row[a].IterNumber+"</td>";
					html += "<td>"+json.root[0].row[a].Exclusivity+"</td>";
					var endRes = json.root[0].row[a].EndReservation.split(" ");
					html += "<td>"+endRes[0]+"</td>";
					html += "<td>"+endRes[1]+"</td>";
				//	html += "<td><input type='text' value='"+endRes[0]+"' class='datepicker'/></td>";
				//	html += "<td><input type='text' value='"+endRes[1]+"' class='timepicker'/></td>";
	                html += "<td>"+json.root[0].row[a].Status+"</td>";
					html +="</tr>";
				}else{
//HTML5
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].DeviceId+"</td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].QueueTime+"</td>";
					html += "<td did='td"+json.root[0].row[a].DeviceId+"' class='toolTip' onclick='ShowDeviceInformation(\""+json.root[0].row[a].HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].HostName+"<div class='tableToolTip' id='divtoolTip"+json.root[0].row[a].DeviceId+"' style='display:none'><ul>";
					html += getTooltipInfo(json.root[0].row[a],"HostName");
					html += "</ul></div></td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].DomainName+"</td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].ManagementIp+"</td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].ConsoleIp+"</td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].Model+"</td>";
					var startRes = json.root[0].row[a].StartReservation.split(" ");
					html += "<td><input style='border:none; text-align:center;' type='text' class='datepickerdev' readonly='yes' value='"+startRes[0]+"' onchange='getResLimit(); getServerTime();'/></td>";
					html += "<td><input style='border:none;text-align:center;' type='text' class='timepicker' readonly='yes' value='"+startRes[1]+"' onchange='getResLimit(); getServerTime();'/></td>";
        	        html += "<td did='td"+json.root[0].row[a].DeviceReservationUserId+a+"' class='toolTip'>"+json.root[0].row[a].DeviceReservationUserId+"<div class='tableToolTip' id='divtoolTip"+json.root[0].row[a].DeviceReservationUserId+a+"' style='display:none;'><ul>";

					html += getTooltipInfo(json.root[0].row[a],"User");
					html +="</ul></div></td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].UserDomainName+"</td>";
					html += "<td>"+json.root[0].row[a].ReservedFrom+"</td>";
					html += "<td><input style='border:none;text-align:center;' onkeypress='return checkNumberInputChar(event,this);' type='text' class='interval' value='"+json.root[0].row[a].TimeInterval+"'/></td>";
    	            html += "<td><input style='border:none;text-align:center;' type='text' class='iteration'  onkeypress='return checkNumberInputChar(event,this);'value='"+json.root[0].row[a].Recurrence+"'</td>";
					html += "<td>"+json.root[0].row[a].IterNumber+"</td>";
					html += "<td class='ReservationReserveTable'>"+json.root[0].row[a].Exclusivity+"</td>";
					var endRes = json.root[0].row[a].EndReservation.split(" ");
					html += "<td><input style='border:none;text-align:center;' readonly='yes' type='text' value='"+endRes[0]+"' class='datepickerdev'/></td>";
					html += "<td><input style='border:none;text-align:center;' readonly='yes' type='text' value='"+endRes[1]+"' class='timepicker'/></td>";
        	        html += "<td>"+json.root[0].row[a].Status+"</td>";
					html +="</tr>";
				}
			}
			$("#reservationRM-table > tbody").empty().append(html);
		//	$("#reservationRM-table").table("refresh");
			globalPageRM = "ReservationReserve";
			$('#RMReservation').trigger('create');
			var ctr;
			ctr = 0;	
			$(".trReserved").on("tap",function(){
				
				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
				   	$('#ReserveButtons').show();
					var val = $(this).attr('rId');
					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('rId');
					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
					$('#ReserveButtons').hide();
				}	
			});
			filterReservationReserve();	
			autoRefreshTable();
			rmExpandedView();
			rmHighlight();
			disableRMButtons();
			hoverTable();
			if(globalDeviceType != 'Mobile'){
			$('.datepickerdev').datepicker();
			$('.timepicker').timepicker({
                ampm: false,
                showTime: true,
                datepicker:false,
                timeFormat: 'hh:mm:ss',
                showSecond: true,
                hourGrid: 6,
                minuteGrid: 10,
               secondGrid: 10
            });
			}


		},
		

	});
	
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadReserveRelease
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 17,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 1
 *  #  DESCRIPTION   : loads the table of selected reservation to be release
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadReserveRelease(){
		
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=getseldev&query={"QUERY":[{"limit":"50","page":"1","resourceid":"'+globalResourceId+'"}]}';
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getseldev&query=limit=50`page=1`resourceid='+globalResourceId;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
      /*      var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

            var html ='',startRes='',endRes='';
//			rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
			$('#ReservationReservReleaseTotalMatches').html(json.root[0].total);
			

			for(var a = 0; a< json.root[0].row.length; a++){
				html += "<tr class='trReservedRelease' devId='"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId + json.root[0].row[a].DeviceReservationUserId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' id='"+json.root[0].row[a].ResourceId+"'  devId='"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId + json.root[0].row[a].DeviceReservationUserId+"'  name='ReservationReserveReleaseSel' onclick='checkSingleRM(\"ReservationReserveRelease\"); '/></td>";
				}

				html += "<td>"+json.root[0].row[a].HostName+"</td>";
				var startRes = json.root[0].row[a].StartReservation.split(" ");
				html += "<td>"+startRes[0]+"</td>";
				html += "<td>"+startRes[1]+"</td>";
                html += "<td>"+json.root[0].row[a].User+"</td>";
				html += "<td>"+json.root[0].row[a].ReservedFrom+"</td>";
				html += "<td>"+json.root[0].row[a].TimeInterval+"</td>";
                html += "<td>"+json.root[0].row[a].Recurrence+"</td>";
				html += "<td>"+json.root[0].row[a].IterNumber+"</td>";
				var endRes = json.root[0].row[a].EndReservation.split(" ");
				html += "<td>"+endRes[0]+"</td>";
				html += "<td>"+endRes[1]+"</td>";
                html += "<td>"+json.root[0].row[a].Status+"</td>";
				html +="</tr>";
				
			}
			$("#RMReleaseDevice-table > tbody").empty().html(html);
			//$("#RMReleaseDevice-table").table("refresh");
			var ctr;
			ctr = 0;	
			 $('#ReleaseDevice').trigger('create');
			 $(".trReservedRelease").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#ReserveReleaseButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					$('#ReserveReleaseButtons').hide();
					ctr--;
				}
				selectedRow();
			});
				globalPageRM = "ReserveRelease";
		}
	});
}
function loadReserveEdit(){
	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getseldev&query=limit=50`page=1`resourceid='+globalResourceId;
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=getseldev&query={"QUERY":[{"limit":"50","page":"1","resourceid":"'+globalResourceId+'"}]}';
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
      /*      var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');*/
            var html ='',startRes='',endRes='';

			//$('#totalMatchesEditTable').html(json.root[0].total);
			$('#totalMatchesEditTable').html(root[0].getAttribute('total'));
		
            for(var a =0; a< row.length; a++){
				html += "<tr class='trReservedEditReservation' devId='"+row[a].getAttribute('DeviceId')+"' rId='"+row[a].getAttribute('ResourceId')+ row[a].getAttribute('DeviceReservationUserId')+"'>";
				
				html += "<td>"+row[a].getAttribute('HostName')+"</td>";
				var startRes = row[a].getAttribute('StartReservation').split(" ");
				html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+startRes[0]+"'/></td>";
				html += "<td><input class='picker' name='mydate' data-role='datebox' data-options='{\"mode\": \"timebox\"}' value='"+startRes[1]+"'/></td>";
				html += "<td><input id='intervalRR' value='"+row[a].getAttribute('TimeInterval')+"'/></td>";
                html += "<td><input id='iterationRR' value='"+row[a].getAttribute('Recurrence')+"'/></td>";
				html += "<td>"+row[a].getAttribute('IterNumber')+"</td>";
				var endRes = row[a].getAttribute('EndReservation').split(" ");
				html += "<td><input style='width:100%;'class='picker' id='endDate' name='mydate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+endRes[0]+"'/></td>";
				html += "<td><input class='picker' style='width:100%' id='endTime' name='mydate' data-role='datebox' data-options='{\"mode\": \"timebox\"}' value='"+endRes[1]+"'/></td>";
				html +="</tr>";
				
			}
			/*for(var a =0; a< json.root[0].row.length; a++){
				html += "<tr class='trReservedEditReservation' devId='"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId + json.root[0].row[a].DeviceReservationUserId+"'>";
				
				html += "<td>"+json.root[0].row[a].HostName+"</td>";
				var startRes = json.root[0].row[a].StartReservation.split(" ");
				html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+startRes[0]+"'/></td>";
				html += "<td><input class='picker' name='mydate' data-role='datebox' data-options='{\"mode\": \"timebox\"}' value='"+startRes[1]+"'/></td>";
				html += "<td><input id='intervalRR' value='"+json.root[0].row[a].TimeInterval+"'/></td>";
                html += "<td><input id='iterationRR' value='"+json.root[0].row[a].Recurrence+"'/></td>";
				html += "<td>"+json.root[0].row[a].IterNumber+"</td>";
				var endRes = json.root[0].row[a].EndReservation.split(" ");
				html += "<td><input style='width:100%;'class='picker' id='endDate' name='mydate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+endRes[0]+"'/></td>";
				html += "<td><input class='picker' style='width:100%' id='endTime' name='mydate' data-role='datebox' data-options='{\"mode\": \"timebox\"}' value='"+endRes[1]+"'/></td>";
				html +="</tr>";
				
			}*/
			$("#editReservationTable> tbody").html(html);
			$("#editReservationTable").table("refresh");
			$('#editDeviceTable').trigger('create');
			var ctr;
			ctr = 0;
			 $(".trReservedEditReservation").on("taphold",function(){
				if($(this).hasClass('highlight') == false){
							$('#ReserveEditButtons').show();
					$(this).addClass('highlight');
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
				}
				selectedRow();
				if(ctr == 0){
					$('#ReserveEditButtons').hide();
				}
			});
		}
	});
}

/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadConnectivity
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : load reservation connevtivity table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function loadConnectivity(){
	var limit = $('#ResourceManagementPageLimit').val();
	var page = $('#RMPageNumber').text();
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}
//	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationConnectivity&query=limit='+limit+'`page='+page+'`sort=`orderby=`user='+globalUserName+'`filter=`domain=`start=`status=`timezone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'&version=3.0';
	var url ='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationConnectivity&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"","start":"","status":"","timezone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}&version="3.0"';
	if(globalDeviceType == "Mobile"){
		loading('show');
	}else{
		$("#RMConnectivity-table > tbody").empty().append(loader);
	}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            var html ='',startRes='',endRes='';
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesConnectivity').html(json.root[0].total);
			}else{

				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
				//$("#RMTotalMatches").html(json.root[0].total);
			}
			if(json.root[0].total == 0){
				html += "<tr><td colspan='24'>No available data.</td></tr>";
				$("#RMConnectivity-table > tbody").empty().append(html);
				return;
			}	
            for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trConnectivity "+tableClass+"' pId='"+json.root[0].row[a].PortReservationId+"' >";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' pId='"+json.root[0].row[a].PortReservationId+"' id='ReservationConnectivity_"+json.root[0].row[a].PortReservationId+"' name='ReservationConnectivitySel' onclick='checkSingleRM(\"ReservationConnectivity\");'/></td>";
				}
//MOBILE
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td>"+json.root[0].row[a].QueueTime+"</td>";
			        html += "<td>"+json.root[0].row[a].Device1HostName+"</td>";
					html += "<td>"+json.root[0].row[a].Device2Description+"</td>";
					if(json.root[0].row[a].Slot1Number == undefined || json.root[0].row[a].Slot1Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Slot1Number+"</td>";
				  	}	
					if(json.root[0].row[a].Module1Number == undefined || json.root[0].row[a].Module1Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Module1Number+"</td>";
				  	}
					if(json.root[0].row[a].Port1Number == undefined || json.root[0].row[a].Port1Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Port1Number+"</td>";
				  	}
					if(json.root[0].row[a].Sub1Number == undefined || json.root[0].row[a].Sub1Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Sub1Number+"</td>";
				  	}
					if(json.root[0].row[a].SwitchPort1Number == undefined || json.root[0].row[a].SwitchPort1Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].SwitchPort1Number+"</td>";
				  	}
					if(json.root[0].row[a].SwitchSlot1Name == undefined || json.root[0].row[a].SwitchSlot1Name ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].SwitchSlot1Name+"</td>";
				  	}
					html += "<td>"+json.root[0].row[a].SwitchHostName+"</td>";
					html += "<td>"+json.root[0].row[a].SwitchDescription+"</td>";
					if(json.root[0].row[a].SwitchSlot2Number == undefined || json.root[0].row[a].SwitchSlot2Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].SwitchSlot2Number+"</td>";
				  	}
					html += "<td>"+json.root[0].row[a].SwitchPort2Number+"</td>";
					if(json.root[0].row[a].Sub2Number == undefined || json.root[0].row[a].SubPort2Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Sub2Number+"</td>";
				  	}
					if(json.root[0].row[a].Port2Number == undefined || json.root[0].row[a].Port2Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Port2Number+"</td>";
				  	}
					if(json.root[0].row[a].Module2Number == undefined || json.root[0].row[a].Module2Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Module2Number+"</td>";
				  	}
					html += "<td>"+json.root[0].row[a].Slot2Number+"</td>";
					html += "<td>"+json.root[0].row[a].Device2HostName+"</td>";
					html += "<td>"+json.root[0].row[a].Device2Description+"</td>";
					html += "<td>"+json.root[0].row[a].User+"</td>";
					html += "<td>"+json.root[0].row[a].StartReservation+"</td>";
					html += "<td>"+json.root[0].row[a].EndReservation+"</td>";
    	            html += "<td>"+json.root[0].row[a].Status+"</td>";
        	        html += "<td>"+json.root[0].row[a].ConnectivityStatus+"</td>";
//HTML5	
				}else{
					html += "<td class='ReservationConnectivity'>"+json.root[0].row[a].QueueTime+"</td>";
			        html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Device1HostName+"</td>";
					html += "<td class='ReservationConnectivity'>"+json.root[0].row[a].Device2Description+"</td>";
					if(json.root[0].row[a].Slot1Number == undefined || json.root[0].row[a].Slot1Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Slot1Number+"</td>";
				  	}	
					if(json.root[0].row[a].Module1Number == undefined || json.root[0].row[a].Module1Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Module1Number+"</td>";
				  	}
					if(json.root[0].row[a].Port1Number == undefined || json.root[0].row[a].Port1Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Port1Number+"</td>";
				  	}
					if(json.root[0].row[a].Sub1Number == undefined || json.root[0].row[a].Sub1Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Sub1Number+"</td>";
				  	}
					if(json.root[0].row[a].SwitchPort1Number == undefined || json.root[0].row[a].SwitchPort1Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].SwitchPort1Number+"</td>";
				  	}
					if(json.root[0].row[a].SwitchSlot1Name == undefined || json.root[0].row[a].SwitchSlot1Name ==""){
					html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device1HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].SwitchSlot1Name+"</td>";
				  	}
					html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].SwitchHostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].SwitchHostName+"</td>";
					html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].SwitchHostName+"\");' style='cursor:pointer;' class='ReservationConnectivity'>"+json.root[0].row[a].SwitchDescription+"</td>";
					if(json.root[0].row[a].SwitchSlot2Number == undefined || json.root[0].row[a].SwitchSlot2Number ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].SwitchHostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].SwitchSlot2Number+"</td>";
			  		}
					html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].SwitchHostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].SwitchPort2Number+"</td>";
					if(json.root[0].row[a].Sub2Number == undefined || json.root[0].row[a].SubPort2Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Sub2Number+"</td>";
				  	}
					if(json.root[0].row[a].Port2Number == undefined || json.root[0].row[a].Port2Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Port2Number+"</td>";
				  	}
					if(json.root[0].row[a].Module2Number == undefined || json.root[0].row[a].Module2Number ==""){
						html+="<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>N/A</td>";
					}else{
						html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Module2Number+"</td>";
				  	}
					html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Slot2Number+"</td>";
					html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].Device2HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].Device2HostName+"</td>";
					html += "<td class='ReservationConnectivity'>"+json.root[0].row[a].Device2Description+"</td>";
					html += "<td class='ReservationConnectivity'>"+json.root[0].row[a].User+"</td>";
					html += "<td class='ReservationConnectivity'>"+json.root[0].row[a].StartReservation+"</td>";
					html += "<td class='ReservationConnectivity'>"+json.root[0].row[a].EndReservation+"</td>";
                	html += "<td>"+json.root[0].row[a].Status+"</td>";
	                html += "<td>"+json.root[0].row[a].ConnectivityStatus+"</td>";
					html +="</tr>";
				}		
			}
			$("#RMConnectivity-table > tbody").html(html);
//			$("#RMConnectivity-table").table("refresh");
			
			globalPageRM = "ReservationConnectivity";
			
			var ctr;
			ctr = 0;
			
			$('#RMConnectivity').trigger('create');
			 $(".trConnectivity").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
				   	$('#ConnectivityButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					$('#ConnectivityButtons').hide();
					ctr--;
				}
				selectedRow();
			});
			rmExpandedView();
			filterReservationConnectivity();
			autoRefreshTable();
			//disableRMButtons();
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadPort
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : December 10,2013
 *  #  REVISION #    : 3
 *  #  DESCRIPTION   : load reservation port table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadPort(){
	var limit = $('#ResourceManagementPageLimit').val();
	var page = $('#RMPageNumber').text();
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}

	//	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationPort&query=limit='+limit+'`page='+page+'`sort=`orderby=`user='+globalUserName+'`filter=`domain=`start=`status=`timezone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'&version=3.0';

		var url ='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationPort&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"","start":"","status":"","timezone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}&version="3.0"';
		if(globalDeviceType == "Mobile"){
			loading('show');
		}else{
			$("#RMPort-table > tbody").empty().append(loader);
		}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {

            var html ='',startRes='',endRes='';
			data = data.replace(/'/g,'"');
			var tableClass = "";
			var json = jQuery.parseJSON(data);
			if(globalDeviceType == "Mobile"){
	           	$('#totalMatchesPort').html(json.root[0].total);
			}else{

				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
				//$("#RMTotalMatches").html(json.root[0].total);
			}
			if(json.root[0].total == 0){
				html += "<tr><td colspan='15'>No available data.</td></tr>";
				$("#RMPort-table > tbody").empty().append(html);
				return;
			}
            for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trPort "+tableClass+"' rpId='"+json.root[0].row[a].ReservedPortId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' rpId='"+json.root[0].row[a].ReservedPortId+"' id='"+json.root[0].row[a].ReservedPortId+"' name='ReservationPortSel' onclick='checkSingleRM(\"ReservationPort\");'/></td>";
				}
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td>"+json.root[0].row[a].DeviceId+"</td>";
			        html += "<td"+json.root[0].row[a].ResvReqTime+"</td>";
			        html += "<td>"+json.root[0].row[a].HostName+"</td>";
					html += "<td>"+json.root[0].row[a].ManagementIp+"</td>";
					html += "<td>"+json.root[0].row[a].Model+"</td>";
	                html += "<td>"+json.root[0].row[a].PortName+"</td>";
					html += "<td>"+json.root[0].row[a].StartReservation+"</td>";
					html += "<td>"+json.root[0].row[a].EndReservation+"</td>";	
					html += "<td>"+json.root[0].row[a].User+"</td>";
					html += "<td>"+json.root[0].row[a].ReservationState+"</td>";
					html += "<td>"+json.root[0].row[a].Exclusivity+"</td>";
					if(json.root[0].row[a].PhysicalPortType == undefined || json.root[0].row[a].PhysicalPortType ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].PhysicalPortType+"</td>";
				  	}
					if(json.root[0].row[a].PortSpeed == undefined || json.root[0].row[a].PortSpeed == ""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].PortSpeed+"</td>";
				  	}
					if(json.root[0].row[a].Bandwidth == undefined || json.root[0].row[a].Bandwidth ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Bandwidth+"</td>";
				  	}
					if(json.root[0].row[a].LineType == undefined || json.root[0].row[a].LineType ==""){
						html+="<td>N/A</td>";
					}else{
					html += "<td>"+json.root[0].row[a].LineType+"</td>";
			  		}
				}else{
					html += "<td class='ReservationPort'>"+json.root[0].row[a].DeviceId+"</td>";
			       	html += "<td class='ReservationPort'>"+json.root[0].row[a].ResvReqTime+"</td>";
			        html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].HostName+"</td>";
					html += "<td class='ReservationPort'>"+json.root[0].row[a].ManagementIp+"</td>";
					html += "<td class='ReservationPort'>"+json.root[0].row[a].Model+"</td>";
	                html += "<td>"+json.root[0].row[a].PortName+"</td>";
					html += "<td>"+json.root[0].row[a].StartReservation+"</td>";
					html += "<td>"+json.root[0].row[a].EndReservation+"</td>";	
					html += "<td>"+json.root[0].row[a].User+"</td>";
					html += "<td>"+json.root[0].row[a].ReservationState+"</td>";
					html += "<td class='ReservationPort'>"+json.root[0].row[a].Exclusivity+"</td>";
					if(json.root[0].row[a].PhysicalPortType == undefined || json.root[0].row[a].PhysicalPortType ==""){
						html+="<td class='ReservationPort'>N/A</td>";
					}else{
						html += "<td class='ReservationPort'>"+json.root[0].row[a].PhysicalPortType+"</td>";
				  	}
					if(json.root[0].row[a].PortSpeed == undefined || json.root[0].row[a].PortSpeed == ""){
						html+="<td class='ReservationPort'>N/A</td>";
					}else{
						html += "<td class='ReservationPort'>"+json.root[0].row[a].PortSpeed+"</td>";
				  	}
					if(json.root[0].row[a].Bandwidth == undefined || json.root[0].row[a].Bandwidth ==""){
						html+="<td class='ReservationPort'>N/A</td>";
					}else{
						html += "<td class='ReservationPort'>"+json.root[0].row[a].Bandwidth+"</td>";
				  	}
					if(json.root[0].row[a].LineType == undefined || json.root[0].row[a].LineType ==""){
						html+="<td class='ReservationPort'>N/A</td>";
					}else{
						html += "<td class='ReservationPort'>"+json.root[0].row[a].LineType+"</td>";
				  	}
				}
				html +="</tr>";
				
			}
			$("#RMPort-table > tbody").html(html);
	//		$("#RMPort-table").table("refresh");
			
			globalPageRM = "ReservationPort";
			$('#RMPort').trigger('create');
			var ctr;
			ctr = 0;
			 $(".trPort").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#PortButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
				}
				selectedRow();
				if(ctr == 0){
					$('#PortButtons').hide();
				}
			});
			filterReservationPort();
			autoRefreshTable();
			rmExpandedView();
		},
		error: function(data){
			if(globalDeviceType == "Mobile"){
				error("RM not responding.","Notification","toConfig();");
	            loading('hide');
			}else{
        	     alerts("RM not responding.");
	        }
		}

	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadHistory
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : December 10,2013
 *  #  REVISION #    : 3
 *  #  DESCRIPTION   : load reservation history table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadHistory(){
	var limit = $('#ResourceManagementPageLimit').val();
	var page = $('#RMPageNumber').text();
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}

		//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationHistory&query=limit='+limit+'`page='+page+'`sort=`orderby=`user='+globalUserName+'`filter=`domain=`start=`status=`timezone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'&version=3.0';

		var url ='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationHistory&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"","start":"","status":"","timezone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}';
		if(globalDeviceType == "Mobile"){
			loading('show');
		}else{
			$("#RMHistory-table > tbody").empty().append(loader);
		}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var tableClass = "";
            var html ='',startRes='',endRes='';
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesHistory').html(json.root[0].total);
			}else{
				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
			}
			if(json.root[0].total == 0){
				html += "<tr><td colspan='13'>No available data.</td></tr>";
				$("#RMHistory-table > tbody").empty().append(html);
				return;
			}
            for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trHistory "+tableClass+"' dhId='"+json.root[0].row[a].DeviceHistoryId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' dhId='"+json.root[0].row[a].DeviceHistoryId+"' id='"+json.root[0].row[a].DeviceHistoryId+"' name='ReservationHistorySel' onclick='checkSingleRM(\"ReservationHistory\");'/></td>";
				}
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td>"+json.root[0].row[a].DeviceID+"</td>";
			        html += "<td>"+json.root[0].row[a].Timestamp+"</td>";
			        html += "<td>"+json.root[0].row[a].HostName+"</td>";
		    	    html += "<td>"+json.root[0].row[a].ManagementIP+"</td>";
					html += "<td>"+json.root[0].row[a].Manufacturer+"</td>";
					html += "<td>"+json.root[0].row[a].Model+"</td>";
    	            html += "<td>"+json.root[0].row[a].User+"</td>";
					html += "<td>"+json.root[0].row[a].StartReservation+"</td>";
					html += "<td>"+json.root[0].row[a].TimeInterval+"</td>";	
					html += "<td>"+json.root[0].row[a].Recurrence+"</td>";
					html += "<td>"+json.root[0].row[a].IterNumber+"</td>";
					html += "<td>"+json.root[0].row[a].EndReservation+"</td>";
					html += "<td>"+json.root[0].row[a].Events+"</td>";

				}else{
					html += "<td class='ReservationHistory'>"+json.root[0].row[a].DeviceID+"</td>";
			        html += "<td class='ReservationHistory'>"+json.root[0].row[a].Timestamp+"</td>";
			        html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].HostName+"</td>";
		    	    html += "<td class='ReservationHistory'>"+json.root[0].row[a].ManagementIP+"</td>";
					html += "<td class='ReservationHistory'>"+json.root[0].row[a].Manufacturer+"</td>";
					html += "<td class='ReservationHistory'>"+json.root[0].row[a].Model+"</td>";
    	            html += "<td>"+json.root[0].row[a].User+"</td>";
					html += "<td>"+json.root[0].row[a].StartReservation+"</td>";
					html += "<td>"+json.root[0].row[a].TimeInterval+"</td>";	
					html += "<td>"+json.root[0].row[a].Recurrence+"</td>";
					html += "<td>"+json.root[0].row[a].IterNumber+"</td>";
					html += "<td>"+json.root[0].row[a].EndReservation+"</td>";
					html += "<td>"+json.root[0].row[a].Events+"</td>";
				}
					html +="</tr>";
			}
			$("#RMHistory-table > tbody").html(html);
	//		$("#RMHistory-table").table("refresh");
			
			globalPageRM = "ReservationHistory";
			var ctr;
			ctr = 0;
			$('#RMHistory').trigger('create');
			 $(".trHistory").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#RHistoryButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
				}
				selectedRow();
				if(ctr == 0){
					$('#RHistoryButtons').hide();
				}
			});
			filterReservationHistory();
			autoRefreshTable();
			rmExpandedView();
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadDevices
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : December 10,2013
 *  #  REVISION #    : 3
 *  #  DESCRIPTION   : load reservation devices table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function loadDevices(){
	var domain = $('#domainSelect').val();
	var zoneName = $('#zoneSelect').val();
	var groupName = $('#groupSelect').val();
	var time = convertTime();
	var dataArr  = time.split(":");
	var endTime = parseInt(dataArr[0])+2+":"+dataArr[1]+":"+dataArr[2];
	var date = new Date();
	var dateToday = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()
	//	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGIV3.py?action=ReservationDevice&query=limit='+showMoreInfo+'`page=1`sort=`orderby=`user='+globalUserName+'`filter=`domain='+domain+"`ZoneName="+zoneName+"`GroupName="+groupName+'&version=3.0';
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}

		var url = getURL('RM4')+'action=ReservationDevice&query={"QUERY":[{"limit":"'+showMoreInfo+'","page":"1","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"'+domain+'","ZoneName":"'+zoneName+'","GroupName":"'+groupName+'"}]}';

		loading('show');
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
           /* var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

            var html ='',startRes='',endRes='';
			$('#totalMatchesDevices').html(json.root[0].total);
			//$('#totalMatchesDevices').html(json.root[0].total);
	

            for(var a =0; a< json.root[0].row.length; a++){

				loading('hide');
				html += "<tr class='trDevices' devId = '"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId+"'>";
		        html += "<td>"+json.root[0].row[a].DeviceId+"</td>";
		        html += "<td>"+json.root[0].row[a].HostName+"</td>";
				html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+dateToday+"'/></td>";
		        html += "<td><input class='picker' name='mydate' id='startTime' data-role='datebox' data-options='{\"mode\": \"timebox\"}' value='"+time+"'/></td>";
				html += "<td><input id='intervalRR"+json.root[0].row[a].DeviceId+"' type='text' class='Interval' value='0'/></td>";
		        html += "<td><input id='iterationRR"+json.root[0].row[a].DeviceId+"' type='text' class='Iteration'value='1'/></td>";
		        html += "<td><select class='DeviceType' id='deviceType"+json.root[0].row[a].DeviceId+"'><option>Non-Exclusive</option><option>Exclusive</option></select></td>";
				html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+dateToday+"'/></td>";
		        html += "<td><input class='picker' name='mydate' id='startTime' data-role='datebox' data-options='{\"mode\": \"timebox\"}'  value='"+endTime+"'/></td>";
				if(json.root[0].row[a].ManagementIp == undefined || json.root[0].row[a].ManagementIp ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].ManagementIp+"</td>";
			  	}
				if(json.root[0].row[a].ConsoleIp == undefined || json.root[0].row[a].ConsoleIp ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].ConsoleIp+"</td>";
			  	}
				if(json.root[0].row[a].Manufacturer == undefined || json.root[0].row[a].Manufacturer ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].Manufacturer+"</td>";
			  	}
				if(json.root[0].row[a].Model == undefined || json.root[0].row[a].Model ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].Model+"</td>";
			  	}
				if(json.root[0].row[a].AvailablePorts == undefined || json.root[0].row[a].AvailablePorts ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].AvailablePorts+"</td>";
			  	}
				if(json.root[0].row[a].DomainName == undefined || json.root[0].row[a].DomainName ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].DomainName+"</td>";
			  	}
				if(json.root[0].row[a].ZoneName == undefined || json.root[0].row[a].ZoneName ==""){
					html+="<td></td>";
				}else{
					html += "<td>"+json.root[0].row[a].ZoneName+"</td>";
			  	}
				if(json.root[0].row[a].GroupName == undefined || json.root[0].row[a].GroupName ==""){
					html+="<td></td>";
				}else{
					html += "<td>"+json.root[0].row[a].GroupName+"</td>";
			  	}
			html +="</tr>";
				
			}
			$("#RMDevices-table > tbody").append(html);
	//		$("#RMDevices-table").table("refresh");
			$("#tabsDevices" ).tabs(); 	
			$("#RMReservation").trigger('create');
			globalPageRM = "ReservationDevices";
			disableColumn();
			var ctr;
			ctr = 0;
			 $(".trDevices").on("taphold",function(){
				var iter = $(this).attr('devId');	
				if($(this).hasClass('highlight') == false){
					getdevicetype($(this).attr('devId'));
					$('#iterationRR'+iter).textinput('enable');
					$('#intervalRR'+iter).textinput('enable');
	
					$(this).addClass('highlight');
					$('#DevicesButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					$('#DevicesButtons').hide();
					ctr--;
				}
				selectedRow();
	//	queryCreateXMLData();
			});
		filterReservationDevices();	
		autoRefreshTable();
		}
	});
}
function loadImportedDevices(){
	var domain = $('#domainSelect').val();
	var zoneName = $('#zoneSelect').val();
	var groupName = $('#groupSelect').val();
	var time = convertTime();
	var dataArr  = time.split(":");
	var endTime = parseInt(dataArr[0])+2+":"+dataArr[1]+":"+dataArr[2];
	var date = new Date();
	var dateToday = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()
	
//		var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=ReservationDevice&query=limit=10`page=1`sort=`orderby=`user='+globalUserName+'`filter=`domain='+domain+"`ZoneName="+zone+"`GroupName="+group;
		if(globalDeviceType == "Mobile"){
			limit = showMoreInfo;
			var page = 1;
		}

		var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=ReservationDeviceAffiliated&query=limit='+showMoreInfo+'`page=1`sort=`orderby=`user='+globalUserName+'`filter=`domain='+domain+"`ZoneName="+zoneName+"`GroupName="+groupName;
		loading('show');
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');
            var html ='',startRes='',endRes='';
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesImportedDevices').html(root[0].getAttribute('total'));
			}else{
				$("#RMTotalMatches").html(root[0].getAttribute('total'));

			}
            for(var a =0; a< row.length; a++){
				html += "<tr class='trImportedDevices' devId = '"+row[a].getAttribute('DeviceId')+"' rId='"+row[a].getAttribute('ResourceId')+"'>";
		
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' id='"+row[a].getAttribute('ResourceId')+"' name='ReservationImportedSel' onclick='checkSingleRM(\"ReservationImported\");/></td>";
				}
				loading('hide');	
		        html += "<td>"+row[a].getAttribute('DeviceId')+"</td>";
		        html += "<td>"+row[a].getAttribute('HostName')+"</td>";
				html += "<td>"+row[a].getAttribute('ManagementIp')+"</td>";
		        html += "<td>"+row[a].getAttribute('ConsoleIp')+"</td>";
		        html += "<td>"+row[a].getAttribute('Manufacturer')+"</td>";
		        html += "<td>"+row[a].getAttribute('Model')+"</td>";
		        html += "<td>"+row[a].getAttribute('AvailablePorts')+"</td>";
		        html += "<td>"+row[a].getAttribute('DomainName')+"</td>";
		        html += "<td>"+row[a].getAttribute('ZoneName')+"</td>";
		        html += "<td>"+row[a].getAttribute('GroupName')+"</td>";
		
				if(row[a].getAttribute('AvailabilityDay') == undefined || row[a].getAttribute('AvailabilityDay') ==""){
					html+="<td></td>";
				}else{
					html += "<td>"+row[a].getAttribute('AvailabilityDay')+"</td>";
			  	}
				if(row[a].getAttribute('AvailabilityTime') == undefined || row[a].getAttribute('AvailabilityTime') ==""){
					html+="<td></td>";
				}else{
					html += "<td>"+row[a].getAttribute('AvailabilityTime')+"</td>";
			  	}
				if(row[a].getAttribute('AvailabilityDate') == undefined || row[a].getAttribute('AvailabilityDate') ==""){
					html+="<td></td>";
				}else{
					html += "<td>"+row[a].getAttribute('AvailabilityDate')+"</td>";
			  	}
				if(row[a].getAttribute('Availability') == undefined || row[a].getAttribute('Availability') ==""){
					html+="<td></td>";
				}else{
					html += "<td>"+row[a].getAttribute('Availability')+"</td>";
			  	}
				html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+dateToday+"'/></td>";
		        html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"timebox\"}' value='"+time+"'/></td>";
		        html += "<td><input id='inter"+row[a].getAttribute('DeviceId')+"' type='text' class='Interval' value='0'/></td>";
		        html += "<td><input id='iter"+row[a].getAttribute('DeviceId')+"' type='text' class='Iteration'value='1'/></td>";
		        html += "<td><select class='DeviceType' id='deviceType'><option>Non-Exclusive</option><option>Exclusive</option></select></td>";
		        html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"calbox\"}' data-options='{\"dateFormat\": \"mm/dd/YYYY\"}' value='"+dateToday+"'/></td>";
		        html += "<td><input class='picker' name='mydate' id='startDate' data-role='datebox' data-options='{\"mode\": \"timebox\"}'  value='"+endTime+"'/></td>";
	      		html += "</tr>";
       		}
			$('#rmImportedDevices').empty().append(html);
	//		$("#RMImportedDevices-table").table("refresh");
			globalPageRM = "ReservationDevices";
			var ctr;
			ctr = 0;
			$('#RMDevices').trigger('create');
				disableColumn();
			 $(".trImportedDevices").on("taphold",function(){
				var iter = $(this).attr('devId');	
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
			//		$('#iter'+iter).textinput('enable');
			//		$('#inter'+iter).textinput('enable');
					$('#DevicesButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
			//		$('#iter'+iter).textinput('disable');
			//		$('#inter'+iter).textinput('disable');
					$('#DevicesButtons').hide();
	
					ctr--;
				}
					selectedRow();
					getdevicetype();
			});
			$('.ui-icon-grid').css({"position":"relative"});
			filterReservationDevices();
			autoRefreshTable();
		}
	});
}
function loadTesttoolHeader(){
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=getDeviceInformation&query=deviceid='+DeviceId;
	var url = getURL('RM4')+'action=getDeviceInformation&query={"QUERY":[{"deviceid":"'+DeviceId+'"}]}';
		$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            var mydata = $.trim(data);
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var hostname = json.HostName;		
			var ipadd = json.IpAddress;		
			var model = json.Model;		
			var version = json.Version;		
			$('#TTHostName').empty().append(hostname);
			$('#TTIpAdd').empty().append(ipadd);
			$('#TTModel').empty().append(model);
			$('#TTVersion').empty().append(version);
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadTesttoolTable
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 24,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : load testtool table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function loadTesttoolTable(){
		
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=portinfos&query=id='+DeviceId;
	var url = getURL('RM4')+'action=portinfos&query={"QUERY":[{"id":"'+DeviceId+'"}]}';
	if(globalDeviceType == "Mobile"){
		loading('show');
	}else{
		$("#RMTesttool-table > tbody").empty().append(loader);
	}
		$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
            var html ='',startRes='',endRes='';
//			$('#totalMatchesTesttool').html(data[0].getAttribute('total'));
			
            for(var a =0; a < json.data[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trTesttool "+tableClass+"' portId='"+json.data[0].row[a].PortId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox'portId='"+json.data[0].row[a].PortId+"' id='"+json.data[0].row[a].PortId+"' name='TesttoolSel' onclick='checkSingleRM(\"Testtool\");'/></td>";
				}
				html += "<td>"+json.data[0].row[a].PortId+"</td>";
				
				if(json.data[0].row[a].PortName == undefined || json.data[0].row[a].PortName ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.data[0].row[a].PortName+"</td>";
			  	}
				if(json.data[0].row[a].PortSpeed == undefined || json.data[0].row[a].PortSpeed ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.data[0].row[a].PortSpeed+"</td>";
			  	}
				html += "<td>"+json.data[0].row[a].Connectivity+"</td>";
				html += "<td>"+json.data[0].row[a].HostName+"</td>";
				html += "<td>"+json.data[0].row[a].PartnerPort+"</td>";
			  	
				html +="</tr>";
				
			}
			$("#RMTesttool-table > tbody").html(html);
			//$("#RMTesttool-table").table("refresh");
			loadTesttoolHeader();
			var ctr;
			ctr = 0;
			$(".trTesttool").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#TesttoolButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
					$('#TesttoolButtons').hide();
				}
				
			selectedRow();	
			});
		}
		
	});
}


/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : disable Column
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 16,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE :  
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : function to disable textbox and dropdown menu
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function disableColumn(){
//Reservation Devices New Reservation Table
	$('.Interval').textinput('disable');
	$('.Iteration').textinput('disable');
//Reservation Devices Load and Save Image Table
	$('.typeLoadImage').textinput('disable');
	$('.protocolLoadImage').textinput('disable');
	$('.serverLoadImage').textinput('disable');
	$('.pathLoadImage').textinput('disable');
	$('.filenameLoadImage').textinput('disable');
	$('.typeLoadConfig').textinput('disable');
	$('.protocolLoadConfig').textinput('disable');
	$('.serverLoadConfig').textinput('disable');
	$('.pathLoadConfig').textinput('disable');
	$('.filenameLoadConfig').textinput('disable');
//add device
	$('#DeviceConsoleIp').textinput('disable');
	$('#DeviceManagementIp').textinput('disable');
	$('#DevicesoftwareVersion').textinput('disable');
	$('#DevicemodelType').textinput('disable');
	$('#Devicedescription').textinput('disable');
	$('#Devicemanufacturer').textinput('disable');
	$('#DeviceserialNumber').textinput('disable');
	$('#Portduplexity').textinput('disable');
	$('#Portbandwidth').textinput('disable');
	$('#Portmtu').textinput('disable');
	$('#Portmodel').textinput('disable');
	$('#PortmediaType').textinput('disable');
	$('#portName').textinput('disable');
	$('#Portspeed').textinput('disable');
	$('#PorthardwareVersion').textinput('disable');
	$('#Portdescription').textinput('disable');
	$('#Portslotnumber').selectmenu('disable');
	$('#Modulehardwareinfo').textinput('disable');
	$('#Moduledescription').textinput('disable');
	$('#Modulehsoftwareinfo').textinput('disable');
	$('#SlotsoftwareVersion').textinput('disable');
	$('#SlothardwareVersion').textinput('disable');
	$('#SlotserialNumber').textinput('disable');
	$('#Slotdescription').textinput('disable');
	$('#SlotproductNumber').textinput('disable');
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadEventScheduler
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : December 10,2013 
 *  #  REVISION #    : 3
 *  #  DESCRIPTION   : load event scheuler table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadEventSched(){
	var limit = $('#ResourceManagementPageLimit').val();
	var page = $('#RMPageNumber').text();
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}

	//var url = getURL('RM4')+'action=EventScheduler&query=limit='+limit+'`page='+page+'`sort=`orderby=`user='+globalUserName+'`filter=`domain=`timezone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'&version=3.0';

	var url = getURL('RM4')+'action=EventScheduler&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"","start":"","status":"","timezone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}&version=3.0';
		if(globalDeviceType == "Mobile"){
			loading('show');
		}else{
			$("#RMEventSched-table > tbody").html(loader);
		}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
         	var html ='',startRes='',endRes='';
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			//data = '{  "root": [{   "row": [{ "EventId": "8043", "Building": "", "ServerType": "AMS", "ConfigDevices": "DemoTestbed_L1_R2, DemoTestbed_L1_R5", "Name": "config_2014-02-17-01-11-01.stat", "FirstName": "Genesis", "Floor": "", "MiddleName": "", "LastName": "Sabiaga", "Hostname": "localhost", "PrimaryGateway": "172.24.1.1", "Department": "", "Authentication": "Database", "PhoneNumber": "", "UserLevel": "Administrator", "EndTime": "2014-02-1703: 11: 01", "HomeAddress": "", "OfficeAddress": "", "MainId": "3113211", "NTP": "172.24.1.14", "Status": "Cancelled", "PrimaryIp": "172.24.1.15", "NoofDevice": "2", "SecondaryInterface": "eth1", "timeStamp": "2014-02-1701: 12: 59", "PrimaryInterface": "eth0", "UserId": "2215", "Email": "gensabiaga@gmail.com", "PrimaryNetMask": "255.255.255.0", "SecondaryNetMask": "255.255.255.240", "User": "gensabiaga", "StartTime": "2014-02-1701: 11: 01", "ResourceId": "593993", "RtmId": "1", "SecondaryIp": "172.24.1.15", "CellPhoneNumber": "" }, { "EventId": "8053", "Building": "", "ServerType": "AMS", "ConfigDevices": "DemoTestbed_L1_R6, DemoTestbed_L1_R2, DemoTestbed_L1_R5", "Name": "config_2014-02-17-01-14-20.stat", "FirstName": "Genesis", "Floor": "", "MiddleName": "", "LastName": "Sabiaga", "Hostname": "localhost", "PrimaryGateway": "172.24.1.1", "Department": "", "Authentication": "Database", "PhoneNumber": "", "UserLevel": "Administrator", "EndTime": "2014-02-1703: 14: 20", "HomeAddress": "", "OfficeAddress": "", "MainId": "3113551", "NTP": "172.24.1.14", "Status": "Cancelled", "PrimaryIp": "172.24.1.15", "NoofDevice": "3", "SecondaryInterface": "eth1", "timeStamp": "2014-02-1701: 02: 01", "PrimaryInterface": "eth0", "UserId": "2215", "Email": "gensabiaga@gmail.com", "PrimaryNetMask": "255.255.255.0", "SecondaryNetMask": "255.255.255.240", "User": "gensabiaga", "StartTime": "2014-02-1701: 14: 20", "ResourceId": "593993", "RtmId": "1", "SecondaryIp": "172.24.1.15", "CellPhoneNumber": "" }], "total": "10", "page": 1, "pages": "1"  }] }';
//			var json = jQuery.parseJSON(data);
	/*		$('#totalMatchesSchedEve').html(root[0].getAttribute('total'));
            for(var a =0; a< row.length; a++){
				html += "<tr class='trSchedEve' erId='"+row[a].getAttribute('EventId')+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' erId='"+row[a].getAttribute('EventId')+"' id='"+row[a].getAttribute('EventId')+"' name='EventSchedulerSel' onclick='checkSingleRM(\"SchedulerEvent\");'/></td>";
				}
				html += "<td>"+row[a].getAttribute('timeStamp')+"</td>";
		        html += "<td>"+row[a].getAttribute('EventId')+"</td>";
		        html += "<td><a sId='"+row[a].getAttribute('Status')+"' mId='"+row[a].getAttribute('MainId')+"' eId='"+row[a].getAttribute('EventId')+"' style='text-decoration:none; color:#000000;' class='sched' href='RMHistoryScheduler2.html'>"+row[a].getAttribute('Name')+"</a></td>";
		        html += "<td>"+row[a].getAttribute('UserId')+"</td>";
				html += "<td>"+row[a].getAttribute('User')+"</td>";
				html += "<td>"+row[a].getAttribute('StartTime')+"</td>";
                html += "<td>"+row[a].getAttribute('EndTime')+"</td>";
				html += "<td>"+row[a].getAttribute('NoofDevice')+"</td>";
				html += "<td>"+row[a].getAttribute('Event')+"</td>";	
				html += "<td>"+row[a].getAttribute('Status')+"</td>";
				html += "<td>"+row[a].getAttribute('RtmId')+"</td>";
				html +="</tr>";
		/*JSON STATIC*/
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesSchedEve').html(json.data[0].total);
			}else{
				rmPagination(json.data[0].pages,json.data[0].page,json.data[0].total);
				//$("#RMTotalMatches").html(json.root[0].total);

			}
			if(json.data[0].total == 0){
				html += "<tr><td colspan='19'>No available data.</td></tr>";
				$("#RMEventSched-table > tbody").empty().append(html);
				return;
			}	
            for(var a =0; a< json.data[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}

				html += "<tr class='trSchedEve "+tableClass+"' erId='"+json.data[0].row[a].EventId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' erId='"+json.data[0].row[a].EventId+"' id='"+json.data[0].row[a].EventId+"' name='EventSchedulerSel' onclick='checkSingleRM(\"SchedulerEvent\");'/></td>";
				}
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td>"+json.data[0].row[a].timeStamp+"</td>";
					html += "<td onclick='showConfigurationInformation();'>"+json.data[0].row[a].EventId+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);' sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' class='sched' >"+json.data[0].row[a].Name+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].UserId+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'  sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' >"+json.data[0].row[a].User+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'  sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' >"+json.data[0].row[a].StartTime+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].EndTime+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'  sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' >"+json.data[0].row[a].NoofDevice+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].Event+"</td>";	
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].Status+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);' sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'  >"+json.data[0].row[a].RtmId+"</td>";
				}else{
					html += "<td class='ReservationSchedEve'>"+json.data[0].row[a].timeStamp+"</td>";
					html += "<td class='ReservationSchedEve' onclick='showConfigurationInformation();'>"+json.data[0].row[a].EventId+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);' sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' class='sched' >"+json.data[0].row[a].Name+"</td>";
					html += "<td class='ReservationSchedEve' style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].UserId+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'  sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' >"+json.data[0].row[a].User+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'  sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' >"+json.data[0].row[a].StartTime+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].EndTime+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'  sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"' >"+json.data[0].row[a].NoofDevice+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].Event+"</td>";	
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'>"+json.data[0].row[a].Status+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);' sid='"+json.data[0].row[a].Status+"' mid='"+json.data[0].row[a].MainId+"' eid='"+json.data[0].row[a].EventId+"'  >"+json.data[0].row[a].RtmId+"</td>";
					}
				html +="</tr>";
			}
			$("#RMEventSched-table > tbody").html(html);
	//		$("#RMEventSched-table").table("refresh");
			
			globalPageRM = "SchedulerEvent";
			var ctr;
			ctr = 0;
			 $(".trSchedEve").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#EventButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
				}
				selectedRow();
				if(ctr == 0){
					$('#EventButtons').hide();
				}
			});
			filterEventSched();
			autoRefreshTable();
			rmExpandedView();
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadHistorySched
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : load scheduler history table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadHistorySched(){
	var limit = $('#ResourceManagementPageLimit').val();
	var page = $('#RMPageNumber').text();
	if(globalDeviceType == "Mobile"){
		limit = showMoreInfo;
		var page = 1;
	}


//	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=HistoryScheduler&query=limit='+limit+'`page='+page+'`sort=`orderby=`user='+globalUserName+'`filter=`domain=`start=`status=`timezone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'&version=3.0';

	var url = getURL('RM4')+'action=HistoryScheduler&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"","start":"","status":"","timezone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}&version=3.0';
		if(globalDeviceType == "Mobile"){
			loading('show');
		}else{
			$("#RMHistorySched-table > tbody").html(loader);
		}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
            var html ='',startRes='',endRes='';
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesSchedHist').html(json.root[0].total);
			}else{

				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
				//$("#RMTotalMatches").html(json.root[0].total);

			}
			if(json.root[0].total == 0){
				html += "<tr><td colspan='8'>No available data.</td></tr>";
				$("#RMHistorySched-table > tbody").empty().append(html);
				return;
			}
		    for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trSchedHist "+tableClass+"' mcId='"+json.root[0].row[a].MainConfigHistoryId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<center><td><input type='checkbox' mcId='"+json.root[0].row[a].MainConfigHistoryId+"' id='"+json.root[0].row[a].MainConfigHistoryId+"' name='HistorySchedulerSel' onclick='checkSingleRM(\"SchedulerHistory\");'/></center></td>";
				}
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].timeStamp+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].EventId+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].ConfigName+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].EventDescription+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].User+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].StartTime+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].EndTime+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].Status+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].RtmId+"</td>";
					
				}else{
					html += "<td class='ReservationSchedHist' style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].timeStamp+"</td>";
					html += "<td class='ReservationSchedHist' style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].EventId+"</td>";
					html += "<td style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].ConfigName+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].EventDescription+"</td>";
					html += "<td  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].User+"</td>";
					html += "<td class='ReservationSchedHist' style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"' >"+json.root[0].row[a].StartTime+"</td>";
					html += "<td class='ReservationSchedHist'  style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].EndTime+"</td>";
					html += "<td   style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].Status+"</td>";
					html += "<td  class='ReservationSchedHist' style='cursor:pointer;' onclick='showConfigurationInformation(this);'   sid='"+json.root[0].row[a].Status+"' mid='"+json.root[0].row[a].MainId+"' eid='"+json.root[0].row[a].EventId+"'>"+json.root[0].row[a].RtmId+"</td>";
				}
				html +="</tr>";
				
			}
			$("#RMHistorySched-table > tbody").html(html);
		//	$("#RMHistorySched-table").table("refresh");
			globalPageRM = "SchedulerHistory";
			var ctr;
			ctr = 0;
			$('#RMHistorySched').trigger('create');
			 $(".trSchedHist").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#SHistoryButtons').show();
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
				}
				selectedRow();
				if(ctr == 0){
					$('#SHistoryButtons').hide();
				}
			});
			filterSchedHistory();
			autoRefreshTable();
			rmExpandedView();
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadManageDevice
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 5,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : load manage device table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadManageDevice(Page){
		var limit = $('#limitOption').val();
		//var url = getURL("RM2","JSON") + 'action=ManageDevice&query=limit='+showMoreInfo+'`page=1`sort=`orderby=`user='+globalUserName+'`filter=`domain=`start=`status=`timezone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'&version=3.0';
		var url = getURL("RM","JSON") + "action=ManageDevice&query={'QUERY':[{'limit':'"+limit+"','page':'"+Page+"','sort':'','orderby':'','user':'"+globalUserName+"','filter':'domain','start':'','status':'','timezone':'"+timezone[0]+timezone[1]+timezone[2]+"^"+timezone[3]+"'}]}&version=3.0";
		if(globalDeviceType == "Mobile"){
			loading('show');
		}else{
			$("#RMManageDevice-table > tbody").html(loader);
		}
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            var html ='',startRes='',endRes='';
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesManageDevice').html(json.root[0].total);
			}else{
				$("#adminTotalMatches").html(json.root[0].total);

			}
			pagination(json.root[0].total, "device");	
	        for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trManDev "+tableClass+"' devId='"+json.root[0].row[a].DeviceId+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' devId='"+json.root[0].row[a].DeviceId+"'  id='"+json.root[0].row[a].DeviceId+"' name='ManageDevicesSel' onclick='checkSingleRM(\"ManageDevices\");'/></td>";
				}
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td>"+json.root[0].row[a].DeviceId+"</td>";
					html += "<td>"+json.root[0].row[a].DateAdded+"</td>";
					html += "<td deviceId='"+json.root[0].row[a].DeviceId+"' onclick='ShowDeviceInformation(this)'>"+json.root[0].row[a].HostName+"</td>";
					html += "<td>"+json.root[0].row[a].ZoneName+"</td>";
					html += "<td>"+json.root[0].row[a].DomainName+"</td>";
					html += "<td>"+json.root[0].row[a].GroupName+"</td>";
					if(json.root[0].row[a].ManagementIp == undefined || json.root[0].row[a].ManagementIp ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].ManagementIp+"</td>";
					}
					if(json.root[0].row[a].ManagementInterface == undefined || json.root[0].row[a].ManagementInterface ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].ManagementInterface+"</td>";
					}
					if(json.root[0].row[a].MacAddress == undefined || json.root[0].row[a].MacAddress ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].MacAddress+"</td>";
					}
					if(json.root[0].row[a].ConsoleIP == undefined || json.root[0].row[a].ConsoleIp ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].ConsoleIp+"</td>";
					}	
					html += "<td>"+json.root[0].row[a].Manufacturer+"</td>";
					html += "<td>"+json.root[0].row[a].Model+"</td>";
					if(json.root[0].row[a].SerialNumber == undefined || json.root[0].row[a].SerialNumber ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].SerialNumber+"</td>";
					}
					html += "<td>"+json.root[0].row[a].Connectivity+"</td>";
					if(json.root[0].row[a].TechnicalSupport == undefined || json.root[0].row[a].TechnicalSupport ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].TechnicalSupport+"</td>";
					}
					if(json.root[0].row[a].Discovery == undefined || json.root[0].row[a].Discovery ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].Discovery+"</td>";
					}
					if(json.root[0].row[a].CPUSpeed == undefined || json.root[0].row[a].CPUSpeed ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].CPUSpeed+"</td>";
					}
					if(json.root[0].row[a].SystemMemory == undefined || json.root[0].row[a].SystemMemory ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].SystemMemory+"</td>";
					}
					if(json.root[0].row[a].NVRAMCF == undefined || json.root[0].row[a].NVRAMCF ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].NVRAMCF+"</td>";
					}
					if(json.root[0].row[a].OSVersion == undefined || json.root[0].row[a].OSVersion ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].OSVersion+"</td>";
					}
				}else{
					html += "<td class='ReservationManage'>"+json.root[0].row[a].DeviceId+"</td>";
					html += "<td class='ReservationManage'>"+json.root[0].row[a].DateAdded+"</td>";
					html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].DeviceId+"\")'>"+json.root[0].row[a].HostName+"</td>";
					html += "<td class='ReservationManage'>"+json.root[0].row[a].ZoneName+"</td>";
					html += "<td>"+json.root[0].row[a].DomainName+"</td>";
					html += "<td class='ReservationManage'>"+json.root[0].row[a].GroupName+"</td>";
					if(json.root[0].row[a].ManagementIp == undefined || json.root[0].row[a].ManagementIp ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].ManagementIp+"</td>";
					}
					if(json.root[0].row[a].ManagementInterface == undefined || json.root[0].row[a].ManagementInterface ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].ManagementInterface+"</td>";
					}
					if(json.root[0].row[a].MacAddress == undefined || json.root[0].row[a].MacAddress ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].MacAddress+"</td>";
					}
					if(json.root[0].row[a].ConsoleIP == undefined || json.root[0].row[a].ConsoleIp ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].ConsoleIp+"</td>";
					}	
					html += "<td>"+json.root[0].row[a].Manufacturer+"</td>";
					html += "<td>"+json.root[0].row[a].Model+"</td>";
					if(json.root[0].row[a].SerialNumber == undefined || json.root[0].row[a].SerialNumber ==""){
						html+="<td>N/A</td>";
					}else{
						html += "<td>"+json.root[0].row[a].SerialNumber+"</td>";
					}
					html += "<td>"+json.root[0].row[a].Connectivity+"</td>";
					if(json.root[0].row[a].TechnicalSupport == undefined || json.root[0].row[a].TechnicalSupport ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].TechnicalSupport+"</td>";
					}
					if(json.root[0].row[a].Discovery == undefined || json.root[0].row[a].Discovery ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].Discovery+"</td>";
					}
					if(json.root[0].row[a].CPUSpeed == undefined || json.root[0].row[a].CPUSpeed ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].CPUSpeed+"</td>";
					}
					if(json.root[0].row[a].SystemMemory == undefined || json.root[0].row[a].SystemMemory ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].SystemMemory+"</td>";
					}
					if(json.root[0].row[a].NVRAMCF == undefined || json.root[0].row[a].NVRAMCF ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].NVRAMCF+"</td>";
					}
					if(json.root[0].row[a].OSVersion == undefined || json.root[0].row[a].OSVersion ==""){
						html+="<td class='ReservationManage'>N/A</td>";
					}else{
						html += "<td class='ReservationManage'>"+json.root[0].row[a].OSVersion+"</td>";
					}
				}
				html +="</tr>";
				
			}
			$("#RMManageDevice-table > tbody").empty().append(html);
			$( "#tabsDevInfo" ).tabs(); 	
			var ctr;
			ctr = 0;		
			globalPageRM = "ManageDevice";
			$(".trManDev").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					$('#ManageButtons').show();
					ctr++;	
				}else{
 	        		$(this).removeClass('highlight');
					ctr--;
				}
				selectedRow();
				if(ctr == 0){
					$('#ManageButtons').hide();
				}
			});
			filterManageDevices();
			autoRefreshTable();
			rmExpandedView();
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : loadHistoryScheduler2
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 10,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : load history scheduler table for connectivity and device logs
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function loadHistoryScheduler2(){
		var limit = $('#ResourceManagementPageLimit2').val();
		var page = $('#ConfigPageNumber').text();
		if(globalDeviceType == "Mobile"){
			limit = showMoreInfo;

			var page = 1;
		}
		//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=geteventdevices&query=limit='+limit+'`page='+page+'`mainid='+devdev1+'`status='+statsstats+'`eventid='+eventid1+'&version=3.0';
		var url = getURL('RM4')+'action=geteventdevices&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","mainid":"'+devdev1+'","status":"'+statsstats+'","eventid":"'+eventid1+'"}]}&version=3.0';
		//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=geteventdevices&query=limit='+limit+'`page='+page+'`mainid='+devdev1+'`status='+statsstats+'`eventid='+eventid1+'&version=3.0';
		//var url = getURL('RM4','JSON')+'action=geteventdevices&query={"QUERY":[{"limit":"'+limit+'","page":"'+page+'","eventid":"'+eventid1+'","status":"'+statsstats+'","mainid":"'+devdev1+'"}]}&version=3.0';
		if(globalDeviceType == "Mobile"){
			loading('show');
		}else{
			$("#RMHistorySched2-table > tbody").append(loader);
		}	

		$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
/*            var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var data = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
            var html ='',startRes='',endRes='';

//			rmPagination(json.data[0].pages,json.data[0].page,json.data[0].total);
			$('#ConfigTotalMatches').html(json.data[0].total);
			for(var a =0; a < json.data[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trSchedHist2 "+tableClass+"'>";
				html += "<td>"+json.data[0].row[a].DeviceId+"</td>";
				if(globalDeviceType == "Mobile"){	
					loading('hide');
		        	html += "<td id='RMDeviceLogs'><a href='RMDeviceLogs.html' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' data-rel='dialog' style='text-decoration:none; color:#000000;'>"+json.data[0].row[a].HostName+"</a></td>";
				}else{
		        	html += "<td id='RMDeviceLogs' style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' onclick='showDeviceLinkLogs(this);'>"+json.data[0].row[a].HostName+"</td>";
				}
					if(json.data[0].row[a].ManagementIp == undefined || json.data[0].row[a].ManagementIp ==""){
						html+="<td  style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' onclick='showDeviceLinkLogs(this);'>N/A</td>";
					}else{
						html += "<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' onclick='showDeviceLinkLogs(this);'>"+json.data[0].row[a].ManagementIp+"</td>";
			  		}
					if(json.data[0].row[a].ConsoleIp == undefined || json.data[0].row[a].ConsoleIp ==""){
						html+="<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"'  onclick='showDeviceLinkLogs(this);'>N/A</td>";
					}else{
						html += "<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"'  onclick='showDeviceLinkLogs(this);'>"+json.data[0].row[a].ConsoleIp+"</td>";
				  	}
					html += "<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' onclick='showDeviceLinkLogs(this);'>"+json.data[0].row[a].Manufacturer+"</td>";
					html += "<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"'  onclick='showDeviceLinkLogs(this);'>"+json.data[0].row[a].Model+"</td>";
					
					if(json.data[0].row[a].OSVersion == undefined || json.data[0].row[a].OSVersion ==""){
						html+="<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' onclick='showDeviceLinkLogs(this);'>N/A</td>";
					}else{
						html += "<td style='cursor:pointer;' class='showLogs' deviceId='"+json.data[0].row[a].DeviceId+"' hostname='"+json.data[0].row[a].HostName+"' onclick='showDeviceLinkLogs(this);'>"+json.data[0].row[a].OSVersion+"</td>";
				  	}
					html +="</tr>";
				
			}
			$("#RMHistorySched2-table > tbody").html(html);
			globalPageRM = "ConfigurationInfo";
			loadHistoryScheduler3();
			$(".trSchedHist2").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
				}else{
 	        		$(this).removeClass('highlight');
				}
			});

			autoRefreshTable();
	
		}
		
	});
}
function loadHistoryScheduler3(){
		
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=geteventinfo&query=eventid='+eventid1+"`status="+statsstats+"`mainid="+devdev1+'&version=3.0';
	//var url = getURL('RM4')+'action=geteventinfo&query={"QUERY":[{"eventid":"'+eventid1+'","status":"'+statsstats+'","mainid":"'+devdev1+'"}]}&version="3.0"';
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=geteventinfo&query=eventid='+eventid1+"`status="+statsstats+"`mainid="+devdev1+'&version=3.0';
	var url = getURL('RM4')+'action=geteventinfo&query={"QUERY":[{"eventid":"'+eventid1+'","status":"'+statsstats+'","mainid":"'+devdev1+'"}]}&version=3.0';
		$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            /*var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var data = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
            var html ='',startRes='',endRes='';
            for(var a = 0; a < json.data[0].row.length; a++){
				
				var id = json.data[0].row[a].ResourceId;
				var jobtype = json.data[0].row[a].JobType;
				var main = json.data[0].row[a].MainId;
				var name = json.data[0].row[a].Name;
				var user = json.data[0].row[a].User;
				
			}
			configname = name;
			ConfigName1 = name;
			ResourceId = id;

			$('#configMainConfigurationId').empty().append(main);
			$('#config_name').empty().append(name);
			$('#configMainConfigId').empty().append(user);
			$('#configJob').empty().append(jobtype);
			$('#configResourceId').empty().append(id);

			
		}
	});
}

function changeType(){
	var url ='https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getImageConfigInfo&query=option'+op2+'&deviceid='+DeviceId+'&location='+val;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
            var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
            var html ='',startRes='',endRes='';
			$('#totalMatchesLoadImage').html(root[0].getAttribute('total'));
			for(var a =0; a< row.length; a++){
				html += "<tr class='trloadImage'>";
				html += "<td>"+row[a].getAttribute('Hostname')+"</td>";
                html += "<td>"+row[a].getAttribute('Model')+"</td>";
				html += "<td><select id='TypeImage'><option>Custom</option><option>Primary</option><option>Secondary</option></select></td>";
				if(row[a].getAttribute('Protocol') == undefined || row[a].getAttribute('Protocol') ==""){
					html+="<td><input type='text' id='ProtocolImage'/></td>";
				}else{
					html += "<td><input type='text' value='"+row[a].getAttribute('Protocol')+"'/></td>";
			  	}
				if(row[a].getAttribute('Server') == undefined || row[a].getAttribute('Server') ==""){
					html+="<td><input type='text' id='ServerImage'/></td>";
				}else{
					html += "<td><input type='text' value='"+row[a].getAttribute('Server')+"'/></td>";
			  	}
				if(row[a].getAttribute('Path') == undefined || row[a].getAttribute('Path') ==""){
					html+="<td><input type='text' id='PathImage'/></td>";
				}else{
					html += "<td><input type='text' value='"+row[a].getAttribute('Path')+"'/></td>";
			  	}
				if(row[a].getAttribute('SystemImageFile') == undefined || row[a].getAttribute('SystemImageFile') ==""){
					html+="<td><input type='text' id='FilenameImage'/></td>";
				}else{
					html += "<td><input value='"+row[a].getAttribute('SystemImageFile')+"'/></td>";
			  	}
                html += "<td><select><option>boot-image</option><option>bootflash</option><option>bootflash0</option><option>bootflash1</option><option>flash</option><option>flash1</option><option>flash2</option><option>disk0</option><option>disk1</option><option>disk1</option><option>disk2</option><option>slot0</option><option>slot1</option><option>slot2</option></select></td>";
				html +="</tr>";
				
			}
			$("#loadImage-table1 > tbody").empty().append(html);
			$("#loadImage-table1").table("refresh");
			$('#RMLoadImage').trigger('create');
			var ctr;
			ctr = 0;	
			$(".trloadImage").on("tap",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('rId');
					ctr--;	
				}
				selectedRow();
			});
		}
	});
	

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : groupHighlight
 #  AUTHOR        : Angeline Bringas
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : December 17, 2013 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : highlights all common reservation
 #  PARAMETERS    :
 #
 #######################################################################
*/
function groupHighlight(val,devId,flag){
	if(globalDeviceType == "Mobile"){
		$('.trReserved').each(function(){
			if (val == $(this).attr('rId')){
				$(this).addClass('highlight');
			}
			if($(this).hasClass('highlight')){
				globalResourceId.push($(this).attr('rIds'));
			}
		});
		return
	}

    $('#reservationRM-table input:checkbox[name="ReservationReserveSel"]').each(function() {
        var rids = $(this).attr('rIds');
        var devids = $(this).attr('did');
		if(val == rids){ 	
	        $(this).attr('disabled',false);
		}
		for(var i = 0 ; i <  globalResourceId.length; i++){
            if(globalResourceId[i] == rids){
                if(devId != $(this).attr('did')){
                    $(this).attr('disabled',true);
                }
            }
		}
    });
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : groupRemoveHighlight
 #  AUTHOR        : Angeline Bringas
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : December 17, 2013 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : removes highlight for common reservations
 #  PARAMETERS    :
 #
 #######################################################################
*/
function groupRemoveHighlight(val){
	$('.trReserved').each(function(){
		if (val == $(this).attr('rId')){
			$(this).removeClass('highlight');
		}
		if($(this).hasClass('highlight')){
			globalResourceId.push($(this).attr('rIds'));
		}	
	});
	$('input:checkbox[name="ReservationReserveSel"]').each(function() {
		if (val == $(this).attr('rId')){
			$(this).parent().parent().removeClass('highlight');
			$(this).attr('disabled',false);
		}
	});

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showDeviceConnections
 #  AUTHOR        : Angeline Bringas
 #  DATE          : December 13,2013
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 1
 #  DESCRIPTION   : shows device sanity
 #  PARAMETERS    :
 #
 #######################################################################
*/
var prevDev = "";
function showDeviceConnections() {
	var h= "";
	var dev = globalDeviceId ;
	var hostname = globalHostName;
	var name = configname;
	setTimeout(function() {
		if (dev == undefined) {
			return;
		}else if (prevDev == "" || dev != prevDev) {
			prevDev = dev;
			if (/^\d+$/i.test(dev)) {
				h = prevDev;
			} else {
				h = did;
			}
			firstrun = 0;
		}
		if ( statsstats == 'provisioning' || statsstats == 'configured' || statsstats == 'provisioned' ) {
			var name = $('#config_name').text();
			EventDeviceLogs(name,h+"_1_"+eventid1,false,0,hostname);
		} else if (statsstats != "scheduled" ) {
			var name = $('#config_name').text();
			EventDeviceLogs(name,h+"_0_"+eventid1,false,0,hostname);
	  	} else if (statsstats == "scheduled" ) {
			if(globalDeviceType == "Mobile"){
				alert("Please wait for reservation to be active to view logs");
			}else{
	
				alerts("Please wait for reservation to be active to view logs");
			}
			return;
		}
	},100);

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : checkConnectivityLogs
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 13,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 1
 *  #  DESCRIPTION   : checks if the text file exists.
 *  #  PARAMETERS    : ConfigName, MappingId
 *  #
 *  #######################################################################
 *  */

function checkConnectivityLogs(ConfigName,MappingId) {

	var path = configname+"/Mapping_"+MappingId+".txt";
	var ret = "";
	$.ajax({
		url : getURL('RM4')+'action=checkconlogs&query={"QUERY":[{"path":"'+path+'"}]}',
//		url : 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkconlogs&query=path='+path,
		async: false,
		dataType : 'html',
		success : function (data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			ret = json.RESULT[0].Result;
		}
	});

	return ret;

}

/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : getDeviceLogs
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 13,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 1
 *  #  DESCRIPTION   : opens the text file containing the device logs
 *  #  PARAMETERS    : ConfigName, DeviceId, HostName
 *  
 *  #######################################################################
 *  */

function getDeviceLogs(ConfigName,DeviceId,HostName) {
	currLogs = "Device";
	$('#eventNewDevicelogstext').empty().append("Config Name: "+configname+"\n");
	$('#eventNewDevicelogstext').append("Device Name: "+HostName+"\n\n");
	$('#eventNewDevicelogstext').append("==================START LOGS===============\n\n");
	$.ajax({
		
//		url : 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=logs&query=path='+configname+'/device_'+DeviceId+'.txt',
		url : getURL('RM4')+'action=logs&query={"QUERY":[{"path":'+configname+'/device_'+DeviceId+'.txt}]}',
		dataType:'html',
		success : function (data) {
			$("#loading-container").dialog("close");
			$(".ui-dialog-buttonpane button:contains('Refresh')").button().attr('disabled',false);
			var reg = /\</gi;
			var myDiv = $('#eventNewDevicelogstext');
			var newdata = data.replace( reg , "" );
			data = newdata;
			if (/End of Device Check/i.test(data)) {
				if (/Start of Enable Interface/i.test(data)) {
					firstrun++;
					if (/End of Enable Interface/i.test(data)) {
						$("#eventNewDevicelogstext").append(data);
						myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
				    	clearInterval(devLog);
					} else {
						$("#eventNewDevicelogstext").append(data);
					myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
					  }
				} else if (/Start of Terminal/i.test(data)) {
					firstrun++;
					if (/End of Terminal|End of Config/i.test(data)) {
						$("#eventNewDevicelogstext").append(data);
						myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
				    	clearInterval(devLog);
					} else {
						$("#eventNewDevicelogstext").append(data);
						myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
					  }
	  			  } else if (firstrun != 0) {
						$("#eventNewDevicelogstext").append(data);
						myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
			    		clearInterval(devLog);
				    } else {
						$("#eventNewDevicelogstext").append(data);
						myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
						firstrun++;
				      }
			} else if (/End of Disable Interface/i.test(data)) {
				$("#eventNewDevicelogstext").append(data);
				myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
			    clearInterval(devLog);
			} else if (/End of Terminal|End of Config/i.test(data)) {
				$("#eventNewDevicelogstext").append(data);
				myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
			    clearInterval(devLog);
			} else {
				$("#eventNewDevicelogstext").append(data);
				myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
		    }
			$("#eventNewDevicelogstext").css({'height':'500px'});
				
		}
	});
}
function EventDeviceLogs(ConfigName, DeviceId, Mapping, MappingId, HostName) {
	if ( Mapping == true || Mapping == "true") {
		var conexists = checkConnectivityLogs(ConfigName,MappingId);
		conexists = $.trim(conexists);
		if (conexists == "0" || conexists == 0) {
			if(globalDeviceType == "Mobile"){
				alert("No connectivity log available");
			return;
			}else {
				alerts("No connectivity log available");
			return;
			}
		}
	}	
	$('#eventNewDevicelogstext').empty();

	if ( Mapping ) {
		
		getConnectivityLogs(ConfigName,MappingId);
	} else {
		var conexists = checkDeviceLogs(ConfigName,DeviceId);
		if (conexists != "0" || conexists != 0) {
			getDeviceLogs(ConfigName,DeviceId,HostName);

			devLog = setInterval(function() {
				getDeviceLogs(ConfigName,DeviceId,HostName);
			},5000);
		} else {
			if(globalDeviceType == "Mobile"){
				alert("No Device Log available.");
			return;
			}else{
				alerts("No Device Log available.");
			return;
			}

		}
	}

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : GetDeviceType
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 13,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : checks the device type
 *  #  PARAMETERS    : devId
 *  #
 *  #######################################################################
  */

function GetDeviceType(){
	var devType = '';
	var URL = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=devtype&query=did='+DeviceId;
//	var URL = getURL('RM4')+'action=devtype&query={"QUERY":[{"did":"'+DeviceId+'"}]}';
	$.ajax({
		url: URL,
		async: false,
		dataType: 'html',
		success: function(data) {
			devType = $.trim(data);

		}
	});
	return devType;
}

function GetDeviceModel(devId){
	var devType = '';
	var URL = "https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getdevicemodel&query=did="+devId;
	$.ajax({
		url: URL,
		async: false,
		dataType: 'text/xml',
		success: function(data) {
			devType = $.trim(data);

		}
	});
	return devType;
}
function getConnectivityLogs(ConfigName,MappingId) {

	currLogs = "Connectivity";
	$('#eventNewDevicelogstext').empty().append("Config Name: "+ConfigName+"\n\n");
	$('#eventNewDevicelogstext').append("==================START LOGS===============\n\n");
	$.ajax({
		
		url : 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=logs&query=path='+configname+'/Mapping_'+MappingId+'.txt',
		success : function (data) {
			var reg = /\</gi;
			var newdata = data.replace( reg , "" );
			data = newdata;
			var myDiv = $('#eventNewDevicelogstext');
			$("#eventNewDevicelogstext").append(data);
		//	myDiv.scrollTop(myDiv.attr("scrollHeight") - myDiv.height());
		}
	});
}
/*
#######################################################################
#
#  FUNCTION NAME : checkDeviceLogs
#  AUTHOR        : Angeline Bringas
#  DATE          : December 13,2013
#  MODIFIED BY   :
#  REVISION DATE :
#  REVISION #    : 
#  DESCRIPTION   : checks if device logs exists
#  PARAMETERS    : ConfigName, DeviceId
#
#######################################################################
*/


function checkDeviceLogs(ConfigName,DeviceId) {
	var path = configname+"/device_"+DeviceId+".txt";
	var ret = "";
	
	$.ajax({
		
		url : getURL('RM4')+'action=checkconlogs&query={"QUERY":[{"path":"'+path+'"}]}',
//		url : 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkconlogs&query=path='+path,
		dataType : 'html',
		async: false,
		success : function (data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			ret = json.RESULT[0].Result;
		}
	});

	return ret;

}
/*
#######################################################################
#
#  FUNCTION NAME : showAllConnections
#  AUTHOR        : Angeline Bringas
#  DATE          : December 13,2013
#  MODIFIED BY   :
#  REVISION DATE :
#  REVISION #    : 
#  DESCRIPTION   : shows all connectivity logs in event and scheduler history
#  PARAMETERS    :
#
#######################################################################
*/


function showAllConnections() {
   if ( statsstats == 'provisioning' || statsstats == 'configured' || statsstats == 'provisioned' || statsstats == "unprovisioning") {
	   var name = $('#config_name').text();
	   EventDeviceLogs(name,1,true,1);
   } else if (statsstats != "scheduled") {
	   var name = $('#config_name').text();
	   EventDeviceLogs(name,1,true,0);
	 } else if (statsstats == "scheduled") {
		   alert("Please wait for reservation to be active to view logs");
		   return;
	   }

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : RMGenerateReport 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 18,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : Generate Report
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function RMGenerateReport(){
	if(globalPageRM == "ReservationReserve"){// Generate Report for Reservation Reserved
       var a =window.location.href = getURL('RM4')+'action=generatereportforreserve&query={"QUERY":[{"resourceid":"'+globalResourceId+'"}]}';
	globalResourceId = [];
	$('#ReserveButtons').hide();
	}else if(globalPageRM == "ReservationPort"){// Generate Report for Reservation Port
		var a =window.location.href = getURL('RM4')+'action=generatereportforport&query={"QUERY":[{"ReservedPortId":"'+genIds+'"}]}';
	$('#PortButtons').hide();
	}else if(globalPageRM == "ReservationConnectivity"){// Generate Report for Reservation Connectivity
		var a =window.location.href = getURL('RM4')+'action=generatereportforconnectivity&query={"QUERY":[{"PortReservationId":"'+genIds+'"}]}';
	genIds = [];
	$('#ConnectivityButtons').hide();
	}else if(globalPageRM == "ManageDevice"){// Generate Report for Manage Devices
		var a =window.location.href = getURL('RM4')+'action=generatereportformanagedevices&query={"QUERY":[{"deviceid":"'+genIds+'"}]}';
	genIds = [];
	$('#ManageButtons').hide();
	}
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : getActiveReservationIteration 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 9,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : get active iteration of reservation
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function getActiveReservationIteration() {
	var ret = "";
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getiterleft&query=resid='+ResId;
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=getiterleft&query={"QUERY":[{"resid":"'+ResId+'"}]}';
	$.ajax({
	url:url,	
		dataType: 'html',
		async: false,
		success:function(data) {
		ret = $.trim(data);

		}
	});

	return ret;
}

/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : setIterationOptions
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 3,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : function that shows specific iterations on checkboxes
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function setIterationOptions() {
    if (globalPageRM == "ReservationReserve") {

        var clname = "";
        switch (globalPageRM) {
            case "ReservationReserve": clname = "resres"; break;
        }

        var resid;
        var d=1;
        var andr;
        $('.'+clname).each(function() {
            if ($(this).is(':checked')) {
                andr = $(this).parent().parent().find('td').eq(14).find('input').val();
                resid = $(this).attr('rid');
            }
        });

        var startIter = getActiveReservationIteration(resid);
        var ileft = andr - startIter;
        if (ileft != 0) { //If multiple iterations
            andr = parseInt(andr) + 1;
            var cnt1 = 1;
            var str = "<div class='header 'style='padding-top:10px'>ITERATIONS</div><div style='padding-top:10px'><table class='noborders' style='width:100%'><tr>";
            for (var x = startIter; x < andr; x++) {
                if (cnt1 == 4) {
                    str += "</tr><tr>";
                    cnt1 = 1;
                }
                str += "<td style='border: 1px solid #FFFBFF'><input type='checkbox' name='specIterSel' value='"+x+"' />"+x+"</td>";
                cnt1++;
            }
            str += "</tr></table></div>";
            $('#specificIterTable').empty().append(str);
        } else {
            $('#iterExt').parent().parent().attr('style','display:none');
          }
    } else {
        $('#iterExt').parent().parent().attr('style','display:none');
      }

}

/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : toggleIterationOptions 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 9,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : dropdown that shows active iteration of reservation
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function toggleIterationOptions(val) {
    if (val != "all") {
		$('#specificIterTable').removeAttr('style');
	    var tabHt = $('#specificIterTable').height();
       	var origHt = $('#Alert').height();
        var newHt = parseInt(tabHt) + parseInt(origHt);
		$('#Alert').height(newHt);	
		$('input[value="same"]').attr('disabled',true);
		$('input[value="extend"]').prop('checked',true);
    } else {
       	var tabHt = $('#specificIterTable').height();
        var origHt = $('#Alert').height();
   	    var newHt = parseInt(origHt) - parseInt(tabHt);
		$('#Alert').height(newHt);
        $('#specificIterTable').attr('style','display:none');
		$('input[value="same"]').attr('disabled',false);
      }

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : toggleDevicesOptions
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 9,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : dropdown that shows devices of reservations
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function toggleDevicesOptions(val) {
    if (val != "all") {
		$('#specificTable').removeAttr('style');
	    var tabHt = $('#specificTable').height();
       	var origHt = $('#Alert').height();
        var newHt = parseInt(tabHt) + parseInt(origHt);
		$('#Alert').height(newHt);
    } else {
       	var tabHt = $('#specificTable').height();
        var origHt = $('#Alert').height();
   	    var newHt = parseInt(origHt) - parseInt(tabHt);
		$('#Alert').height(newHt);
        $('#specificTable').attr('style','display:none');
      }

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : getDevicesFromSelectedReservation 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 9,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : gets device of selected reservation
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function getDevicesFromSelectedReservation() {
	//var url = "https://"+CURRENT_IP+"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getseldev2&query=selected="+ResId;
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=getseldev2&query={'QUERY':[{'selected':'"+ResId+"'}]}";

	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			var cnt = 0;
            var str = "<div style='padding-top:10px'>DEVICES</div><div style='padding-top:10px'><table class='noborders' style='width:100%'><tr>";
            for (var x = 0; x < json.RESULT.length; x++) {
	            if (cnt == 3) {
     	    		str += "</tr><tr>";
        	        cnt = 0;
                }
                str += "<td style='border: 1px solid #FFFBFF'><input type='checkbox' name='specDevSel' value='"+json.RESULT[x].DeviceId+"' />&nbsp;"+json.RESULT[x].HostName+"</td>";
                cnt++;
            }
            str += "</tr></table></div>";
			$('#specificTable').empty().append(str);				
		}
	});

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : selectedRow 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 18,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : highlights the selected row on table 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function selectedRow(){
	//Reservtion Connectivity
	genIds = [];
	$('.trConnectivity').each(function(){
		if($(this).hasClass('highlight')){
			genIds.push($(this).attr('pId'));
		}
	});
	//Reservation Port
	$('.trPort').each(function(){
		if($(this).hasClass('highlight')){
			genIds.push($(this).attr('rpId'));
		}
	});
	//Manage Devices
	$('.trManDev').each(function(){
		if($(this).hasClass('highlight')){
			genIds.push($(this).attr('devId'));
		}
	});
	//Scheduler Event
	scheventid = [];
	$('.trSchedEve').each(function(){
		if($(this).hasClass('highlight')){
			scheventid.push($(this).attr('erId'));	
		}
	});
	//Reservation Reserved
	globalResourceId =[];
	$('.trReserved').each(function(){
		if($(this).hasClass('highlight')){
			globalResourceId.push($(this).attr('rIds'));	
			ResId = $(this).attr('rIds');
		}
	});
	//Tbl for releasing reservation
	DeviceId = [];
	$('.trReservedRelease').each(function(){
		if($(this).hasClass('highlight')){
			globalResourceId.push($(this).attr('rId'));	
			DeviceId.push($(this).attr('devId'));	
		}
	});
	//Reservation Devices (Imported)
	$('.trImportedDevices').each(function(){
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('devId'));
			StartDate.push($.trim($(this).parent().find('td').eq(14).find('input').val()));
			TimeInterval.push($.trim($(this).parent().find('td').eq(16).find('input').val()));
			Recurrence.push($.trim($(this).parent().find('td').eq(17).find('input').val()));
			StartTime.push($.trim($(this).parent().find('td').eq(15).find('input').val()));
			EndDate.push($.trim($(this).parent().find('td').eq(19).find('input').val()));
			EndTime.push($.trim($(this).parent().find('td').eq(20).find('input').val()));
		

		}
	});
	//Reservation Devices(Local)
	$('.trDevices').each(function(){
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('devId'));
			StartDate.push($.trim($(this).parent().find('td').eq(10).find('input').val()));
			TimeInterval.push($.trim($(this).parent().find('td').eq(12).find('input').val()));
			Recurrence.push($.trim($(this).parent().find('td').eq(13).find('input').val()));
			StartTime.push($.trim($(this).parent().find('td').eq(11).find('input').val()));
			EndDate.push($.trim($(this).parent().find('td').eq(15).find('input').val()));
			EndTime.push($.trim($(this).parent().find('td').eq(16).find('input').val()));
			DeviceReservation.push($.trim($(this).parent().find('td').eq(14).find('select').val()));
		}
	});
	//Reservation History
	$('.trHistory').each(function(){
		if($(this).hasClass('highlight')){
			deviceHistoryId.push($(this).attr('dhId'));	
		}
	});
	$('.trSchedHist').each(function(){
		if($(this).hasClass('highlight')){
			mainConfigHistoryId.push($(this).attr('mcId'));	
		}
	});
	$('.trManDev').each(function(){
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('devId'));	
		}
	});
	$('.trTesttool').each(function(){
		if($(this).hasClass('highlight')){
			PortId.push($(this).attr('portId'));	
		}
	});
	$('.trReservedEditReservation').each(function(){
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('devId'));	
			StartDate.push($.trim($(this).parent().find('td').eq(1).find('input').val()));
			TimeInterval.push($.trim($(this).parent().find('td').eq(3).find('input').val()));
			Recurrence.push($.trim($(this).parent().find('td').eq(4).find('input').val()));
			StartTime.push($.trim($(this).parent().find('td').eq(2).find('input').val()));
			EndDate.push($.trim($(this).parent().find('td').eq(5).find('input').val()));
			EndTime.push($.trim($(this).parent().find('td').eq(6).find('input').val()));

		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : selectedAllRow 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 3,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 1
 *  #  DESCRIPTION   : selects all data in the table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function selectedAllRow(){
	$('.trReserved').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmReserveSelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#ReserveButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmReserveSelectAll').text('Deselect All');
			$('#ReserveButtons').show();
		}
		if($(this).hasClass('highlight')){
			globalResourceId.push($(this).attr('rIds'));
		}
	});
	$('.trReservedRelease').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmReleaseSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmReleaseSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			globalResourceId.push($(this).attr('rIds'));
		}
	});
	$('.trConnectivity').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmConnectivitySelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#ConnectivityButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmConnectivitySelectAll').text('Deselect All');
			$('#ConnectivityButtons').show();
		}
		if($(this).hasClass('highlight')){
			genIds.push($(this).attr('pId'));
		}

	});
	$('.trPort').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmPortSelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#PortButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmPortSelectAll').text('Deselect All');
			$('#PortButtons').show();
		}
		if($(this).hasClass('highlight')){
			genIds.push($(this).attr('rpId'));
		}
	});
	$('.trHistory').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmHistorySelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmHistorySelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			deviceHistoryId.push($(this).attr('dhId'));	
		}
	});
	$('.trDevices').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmDevicesSelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#DevicesButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmDevicesSelectAll').text('Deselect All');
			$('#DevicesButtons').show();
		}
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('devId'));
		}
	});
	$('.trImportedDevices').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmImportedDevicesSelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#DevicesButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmImportedDevicesSelectAll').text('Deselect All');
			$('#DevicesButtons').show();
		}
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('devId'));	
		}
	});
	$('.trSchedEve').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmEventSchedulerSelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#EventButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmEventSchedulerSelectAll').text('Deselect All');
			$('#EventButtons').show();
		}
		if($(this).hasClass('highlight')){
			scheventid.push($(this).attr('erId'));	
		}
	});
	$('.trSchedHist').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmHistorySchedulerSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmHistorySchedulerSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			mainConfigHistoryId.push($(this).attr('mcId'));	
		}
	});
	$('.trManDev').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmManageSelectAll').text('Select All');
			$(this).removeClass('highlight');
			$('#ManageButtons').hide();	
		}else{
			$(this).addClass('highlight');
			$('#rmManageSelectAll').text('Deselect All');
			$('#ManageButtons').show();
		}
		if($(this).hasClass('highlight')){
			genIds.push($(this).attr('devId'));
		}
	});
	$('.trLoadImage').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmLoadImageSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmLoadImageSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('deviceId'));
		}
	});
	$('.trLoadConfig').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmLoadConfigSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmLoadConfigSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('deviceId'));
		}
	});
	$('.trSaveImage').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmSaveImageSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmSaveImageSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('deviceId'));
		}
	});
	$('.trSaveConfig').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmSaveConfigSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmSaveConfigSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			DeviceId.push($(this).attr('deviceId'));
		}
	});
	$('.trTesttool').each(function(){
		if($(this).hasClass('highlight')){
			$('#rmTesttoolSelectAll').text('Select All');
			$(this).removeClass('highlight');
		}else{
			$(this).addClass('highlight');
			$('#rmTesttoolSelectAll').text('Deselect All');
		}
		if($(this).hasClass('highlight')){
			PortId.push($(this).attr('portId'));
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : SchedCancel 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 19,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : Cancel events in scheduler event 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function SchedCancel(){
	//var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/RM/RM.py?action=cancelevents&query=resourceid='+scheventid;
	var cgiUrl = getURL('RM3')+'action=cancelevents&query={"RESERVATION":[{"resourceid":"'+scheventid+'"}]}';
	
	$.ajax({
	
		url: cgiUrl,
		dataType: '',
		timeout: 60000,
		success:function(data) {
			data = $.trim(data);
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			 if (json.RESULT[0].Return == 1) {
              //  eval(todo);
              	if(globalDeviceType == "Mobile"){
					alert('Cancellation Success!');
					loadEventSched();
				}else{
	                alerts('Cancellation Success!');
					loadEventSched();
				}
            }
			/* else {
                eval(todo);
            }*/

				//alert('Cancellation Success!');	
			
			logCheck(globalUserName,"Resource Management", "Cancelled an Event");
		},
		error: function() {
		
			alert("Cancellation Failed.");
		
		}
		
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : clearRHistory
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : December 20,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : clears history in reservation history table
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function clearRHistory(){

	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=dsrh&query=id='+deviceHistoryId;
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=dsrh&query={"QUERY":[{"id":"'+deviceHistoryId+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success:function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if(json.RESULT[0].Result == "1"){
				if(globalDeviceType == "Mobile"){
					alert('Delete Success!');
				}else{
					alerts('Delete Success!');
					loadHistory();
				}
				deviceHistoryId = [];
				logCheck(globalUserName,"Resource Management", "Cleared A Single Reservation History Entry");
			}
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : clearSHistory 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 3,2013
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : clears history in scheduler history table 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function clearSHistory(){

	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=dssh&query=id='+mainConfigHistoryId;
	var url = getURL('RM4')+'action=dssh&query={"QUERY":[{"id":"'+mainConfigHistoryId+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success:function(data){
			data = $.trim(data);
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if(json.RESULT[0].Result == 1){
				if(globalDeviceType == "Mobile"){
					alert('Delete Success!');
					loadHistorySched();
				}else{
					alerts('Delete Successful!');
					loadHistorySched();
				}
				mainConfigHistoryId = [];
				logCheck(globalUserName,"Resource Management", "Cleared A Single Reservation History Entry");
			}
		}
	});
}
/*#########################################################################
 *
 *  FUNCTION NAME : clearAllHistory 
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 6,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : clears all information in reservation history table
 *  PARAMETERS    : 
 *
 *#########################################################################
 */
function clearAllHistory(){
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=darh&query=user='+globalUserName;
	var url = getURL('RM4')+'action=darh&query={"QUERY":[{"user":"'+globalUserName+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success:function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if(json.RESULT[0].Result == "1"){
				if(globalDeviceType == "Mobile"){
					alert('Delete Success!');
				}else{
					alerts('Delete Success!');
					loadHistory();
					$('#cbReservationHistory').removeAttr('checked,false');
				}
				mainConfigHistoryId = [];
				logCheck(globalUserName,"Resource Management", "Cleared All Reservation History Entry");
			}
		}
	});

}
/*#########################################################################
 *
 *  FUNCTION NAME : clearAllSchedHistory 
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 7,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : clears all information in scheduler history table
 *  PARAMETERS    : 
 *
 *#########################################################################
 */
function clearAllSchedHistory(){
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=dash&query=user='+globalUserName;
	var url = getURL('RM4')+'action=dash&query={"QUERY":[{"user":"'+globalUserName+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success:function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			data = $.trim(data);
			if(json.RESULT[0].Result.data == 1){
				if(globalDeviceType == "Mobile"){
					error('Delete Success!');
					logCheck(globalUserName,"Resource Management", "Cleared All Scheduler History Entry");
				}else{
					alerts('Delete Success!');
					loadHistorySched();
					logCheck(globalUserName,"Resource Management", "Cleared All Scheduler History Entry");

				}
			}
		}
	});


}
/*#########################################################################
 *
 *  FUNCTION NAME : checkIfTheresAnotherUser
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 7,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : checks if there are reservation that doesn't belong to user's account.
 *  PARAMETERS    : 
 *
 *#########################################################################
 */
function checkIfTheresAnotherUser(type){
//	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkresusers&query=ids='+globalResourceId+'^user='+globalUserName;
	var url = getURL('RM4')+'action=checkresusers&query={"QUERY":[{"ids":"'+globalResourceId+'","user":"'+globalUserName+'"}]}';
//	var ret = "";
	$.ajax({
		url: url,
		dataType: 'html',
		success:function(data){
			ret = $.trim(data);
			var todo = "loadReserve();"
			if(type == "single"){
					todo += "releaseSpecificDevice();"
				}else{
					todo += "releaseAllDevices();"
				}
			if(data == 1){
				alerts('There are devices from other users. Are you sure you want to release the following?',todo,"yesno");
			}else{
				alerts('Are you sure you want to release the following reservation?',todo,"yesno");
			}
		}
	});
//	return ret;
}
/*#########################################################################
 *
 *  FUNCTION NAME : releaseAllDevices
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 7,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 *#########################################################################
 */
function releaseAllDevices(){
	//var cgiUrl = getURL('RM3')+'action=cancel&query=ResourceId='+globalResourceId;
	var cgiUrl = getURL('RM3')+'action=cancel&query={"RESERVATION":[{"ResourceId":"'+globalResourceId+'"}]}';
	$.ajax({
	
		url: cgiUrl,
		dataType: 'html',
		timeout: 300000,
		success:function(data) {
			data = $.trim(data);	
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			if(json.RESULT[0].Return == "1"){
				if(globalDeviceType == "Mobile"){
					alert('Release Successful!');
				}else{
					alerts('Release Successful!');
					$('#Alert').dialog("close");
					loadReserve();
				}
			}else if(json.RESULT[0].Return == "Alert: Device/s is/are still provisioning."){
				if(globalDeviceType == "Mobile"){
					alert("Alert: Device/s is/are still provisioning.");
				}else{
					alerts('Alert: Device/s is/are still provisioning.');
					$('#Alert2').dialog("close");
				}
			}
			logCheck(globalUserName,"Resource Management", "Released All Devices");
		},
		error: function() {
			if(globalDeviceType == "Mobile"){	
				alert("Release failed.");
			}else{
				alerts("Release failed!");
			}
		}
		
	});
}
/*#########################################################################
 *
 *  FUNCTION NAME : ReleaseSpecific 
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 6,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : release specific device
 *  PARAMETERS    : 
 *
 *#########################################################################
 */
function ReleaseSpecific(){
	//var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/RM/RM.py?action=manualmatrixrelease&query=r='+ResId+'*d='+DeviceId;
	var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/RM.py?action=manualmatrixrelease&query={"RESERVATION":[{"r":"'+ResId+'","d":"'+DeviceId+'"}]}';
	$.ajax({
	
		url: cgiUrl,
		dataType: 'html',
		timeout: 300000,
		success:function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			refreshAvailability = true;
			if (json.RESULT[0].Result == "1") {
				if(globalDeviceType == "Mobile"){
					alert('Release Successful!');
					loadReserveRelease();
				}else{
					alerts('Release Successful!');
					loadReserveRelease();
					$('#Alert').dialog("close");
				}
			}else if(json.RESULT[0].Result == "Alert: Device/s is/are still provisioning."){
				if(globalDeviceType == "Mobile"){
					alert("Alert: Device/s is/are still provisioning.");
				}else{
					alerts('Alert: Device/s is/are still provisioning.');
					$('#Alert2').dialog("close");
				}
			}
			
			
		}
	});
}
/*#########################################################################
 *
 *  FUNCTION NAME : checkExtensionLimit
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 8,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : checks if user exceeds his/her reservation extension limit 
 *  PARAMETERS    : 
 *
 *#########################################################################
 */

function checkExtensionLimit() {
	var ret = "";
	//var url='https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkextensionlimit&query=user='+globalUserName+'&resourceid='+globalResourceId;
	var url='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=checkextensionlimit&query={"QUERY":[{"user":"'+globalUserName+'","resourceid":"'+globalResourceId+'"}]}';
	$.ajax({
		url: url,	
		dataType: 'html',
		async: false,
		success:function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			ret = $.trim(data);
			if(json.RESULT[0].Return == "1" || json.RESULT[0].Return == 1){
				if(globalDeviceType == "Mobile"){
					alert('User has reached the maximum limit of extending the reservation');
				}else{
					alerts('User has reached the maximum limit of extending the reservation');
				}
			}
		}
	});

	return ret;

}
/*#########################################################################
 *
 *  FUNCTION NAME : checkUnprovisioningStatus
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 15,2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 *#########################################################################
 */

function checkUnprovisioningStatus() {
	var retcerd = "";
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkunprovisioningstatus&query=user='+globalUserName+'&resourceid='+globalResourceId;
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=checkunprovisioningstatus&query={"QUERY":[{"user":"'+globalUserName+'","resourceid":"'+globalResourceId+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data){
			retcerd = $.trim(data);
		}
	});

	return retcerd;
}
/*#########################################################################
 *
 *  FUNCTION NAME : deleteManageDevice
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 3,2014
 *  MODIFIED BY   : Cathyrine C. Bobis
 *  REVISION DATE : March 30, 2014
 *  REVISION #    : 
 *  DESCRIPTION   : delete device in Manage devices table
 *  PARAMETERS    : 
 *
 *#########################################################################
 */
function deleteManageDevice(){
	var url = getURL("RM","JSON");
	var queryS = "{ 'QUERY': [{'DeviceId': '"+genIds+"', 'User': '"+globalUserName+"'}]}";
	$.ajax({
		url: url,
		data : {
			"action": "deletedevice",
			"query": queryS,
		},
		dataType: 'html',
		success:function(data){
			data = $.trim(data);
			if(globalInfoType == "JSON"){
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var RESULT = dat2.RESULT;
				var Result = RESULT[0].Result

				if(Result=="1"){
					alertUser('Delete Success!');
					DeviceId = [];
					setTimeout(function(){
						changeAdminPage(10);
						loadManageDevice(1);
					},300);
					logCheck(globalUserName,"Resource Management", "Deleted a Device in Manage Devices table.");
					return true;
				}else{
					alertUser("Process failed.");
					return false;
				}
			}else{
				if(data == 1){
					alertUser('Delete Success!');
					DeviceId = [];
					logCheck(globalUserName,"Resource Management", "Deleted a Device in Manage Devices table.");
					loadManageDevice(1);
				}else{
					alertUser("Process failed.");
					return false;
				}
			}

			
		}
	});
}

function addManageDevice() {
	
        var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getuser&query=status=Off`user='+globalUserName+'`act=click';
        //var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getuser&query={"QUERY":[{"status":"Off","user":"'+globalUserName+'","act":"click"}]}';
    $.ajax({
		url: url,
        dataType: 'html',
         success: function(data) {
            
         }
    });
}


/*#########################################################################
 *
 *  FUNCTION NAME : logCheck
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 3,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : tracks all action done by the user in each page
 *  PARAMETERS    : none
 *
 *#########################################################################
 */

function logCheck(UserName,Page,Action) {

    var qstr = "action=Logs&UserName="+UserName+"&Page="+Page+"&Action="+Action+"&ipAdd="+CURRENT_IP;
    var cgiURL= "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminLogs.fcgi?";

   $.ajax({
        url: cgiURL+qstr,
        dataType: 'html',
        success: function(data) {

		}
	});

}
/*#########################################################################
 *
 *  FUNCTION NAME : getZoneForResDev
 *  AUTHOR        : Angeline Bringas
 *  DATE          : January 3,2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all the zone binded for the domain selected 
 *  PARAMETERS    : none
 *
 *#########################################################################
 */
function getZoneForResDev() {

	var domain = $('#domainSelect').val();
//	var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getZone&query=domain='+domain+"`user="+globalUserName;
	var cgiUrl = getURL('RM4')+'action=getZone&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url: cgiUrl,	
		dataType: 'html',
		async: false,
		success:function(data) {
	/*		var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
            var row = xmlDoc.getElementsByTagName('row');*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			var opT='';
			for(var a =0; a< json.data[0].row.length; a++){
                var zoneId = json.data[0].row[a].ZoneId;
				var zoneName = json.data[0].row[a].ZoneName;
				if (domain == "" && zoneId != "") {
					var domName = json.data[0].row[a].DomainName;
					opT += '<option value="'+zoneId+'" did="'+zoneName+'" title="Domain: '+domName+'">'+zoneName+'</option>';
				} else {
					opT += '<option value="'+zoneId+'" did="'+zoneName+'">'+zoneName+'</option>';
				  }
			}
			$('#zoneSelect').empty().append(opT);
			if ($('#domainSelect').val() != "") {
				if (json.data[0].row.length == 1) {
    	            $('#zoneSelect').hide();
        	        $('#tdZone').empty().append("<b>Resource Zone: </b>"+json.data[0].row[0].ZoneName);
            	    $('#tdZone').removeAttr('style');
	            } else {
    	            $('#tdZone').empty().append("<b>Resource Zone: </b>").removeAttr('style');
        	        $('#tdZone').next().removeAttr('style');
            	    $('#zoneSelect').removeAttr('style').attr('style','width:auto;max-width:auto');
              	  }
			} else {
				$('#tdZone').attr('style','display:none');
				$('#zoneSelect').hide();
			  }

			getGroupForResDev();

		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getGroupForResDev
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 13,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : get all the group binded for the selected zone and domain
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function getGroupForResDev() {

	var zid = $('#zoneSelect').val();
	var did = $('#domainSelect').val();
//	var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getGroup&query=ZoneId='+zid+"`user="+globalUserName+"`domain="+did;
	var cgiUrl = getURL('RM4')+'action=getGroup&query={"QUERY":[{"ZoneId":"'+zid+'","user":"'+globalUserName+'","domain":"'+did+'"}]}';
	$.ajax({
		url: cgiUrl,	
		dataType: 'html',
		async: false,
		success:function(data) {
		/*	var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
            var row = xmlDoc.getElementsByTagName('row');*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			var opT='';
			for(var a =0; a< json.data[0].row.length; a++){
                var groupId = json.data[0].row[a].GroupId;
				var groupName = json.data[0].row[a].GroupName;
				if (zid == "" && groupId != "") {	
					var zonename = json.data[0].row[a].ZoneName;		
					var domainname = json.data[0].row[a].DomainName;		
					opT += '<option value="'+groupId+'" title="Domain: '+domainname+'\nZone: '+zonename+'">'+groupName+'</option>';
				} else {
					opT += '<option value="'+groupId+'">'+groupName+'</option>';
				  }
			}
			$('#groupSelect').empty().append(opT);
			if ($('#zoneSelect').val() != "") {
				if (json.data[0].row.length == 1) {
    	            $('#groupSelect').hide();
        	        $('#tdGroup').empty().append("<b>Group: </b>"+json.data[0].row[0].GroupName);
            	    $('#tdGroup').removeAttr('style');
	            } else {
    	            $('#tdGroup').empty().append("<b>Group: </b>").removeAttr('style');
        	        $('#tdGroup').next().removeAttr('style');
            	    $('#groupSelect').removeAttr('style').attr('style','width:auto;max-width:auto');
              	  }
			} else {
				$('#tdGroup').attr('style','display:none');
				$('#groupSelect').hide();
			}
	
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getDomainsForResDev
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 13,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : get all the domain binded for the user log-in
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDomainsForResDev() {

	var ret = "";
//	var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getDomain&query=username='+globalUserName;
	var cgiUrl = getURL('RM4')+'action=getDomain&query={"QUERY":[{"username":"'+globalUserName+'"}]}';
	$.ajax({
		url: cgiUrl,	
		dataType: 'html',
		async: false,
		success:function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

		/*	var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
            var row = xmlDoc.getElementsByTagName('row');*/
			var opT='';
			for(var a =0; a< json.data[0].row.length; a++){
                var domId = json.data[0].row[a].DomainId;
				var domName = json.data[0].row[a].DomainName;
				opT += '<option value="'+domId+'">'+domName+'</option>';
			}

			$('#domainSelect').empty().append(opT);
			if ($('#domainSelect').val() != "") {
				if (json.data[0].row.length == 1) {
    	            $('#domainSelect').hide();
        	        $('#tdDomain').empty().append(json.data[0].row[0].DomainName);
                	$('#tdDomain').removeAttr('style');
            	} else {
	                $('#tdDomain').empty();
    	            $('#domainSelect').removeAttr('style').attr('style','width:auto;max-width:auto');
        	      }
			}
			var dom = $('#domainSelect').val();
			getDeviceAccess(dom);
			getZoneForResDev();
		}

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getDeviceAccess
 #  AUTHOR        : Angeline Bringas
 #  DATE          : Janury 13,2014 PST
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : checks if domain has external devices binded
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDeviceAccess(id) {

	//var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkdeviceaccess&query=domain='+id+'`user='+globalUserName;
	var cgiUrl = getURL('RM4')+'action=checkdeviceaccess&query={"QUERY":[{"domain":"'+id+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url: cgiUrl,	
		dataType: 'html',
		async: false,
		success:function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if (json.RESULT[0].Result == "0") {
				$('#tabsDevices').tabs();
				$('#liImported').hide();
				$('#liTabImported').hide();
			} else {
				$('#liImported').show();
				$('#liTabImported').show();
			}
		}
		
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getServerTime 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 13,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : fetches server time 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getServerTime() {

	//var cgiUrl = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=localtime&query=tZone='+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3];
	var cgiUrl = getURL('RM4')+'action=localtime&query={"QUERY":[{"tZone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+'"}]}';
    var currData;
    $.ajax({
        url: cgiUrl,
        dataType: 'html',
		async: false,
        success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			currData = json.RESULT[0].Result;
		}
    });

	return currData;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : converttoServertime
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 21,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : fetches reservation startdate,start time, enddate and endtime
 #  PARAMETERS    : startDate,startTime,endDate,endTime
 #
 #######################################################################
*/
function converttoServertime(startDate,startTime,endDate,endTime){
	if(globalPageRM == "ReservationReserve"){
		var dataArr = startDate.split('-');	
		var dataArr2 = endDate.split('-');	
		if(dataArr.length > 1){
			startDate  = dataArr[1]+"/"+dataArr[2]+"/"+dataArr[0];
			endDate  = dataArr2[1]+"/"+dataArr2[2]+"/"+dataArr2[0];
		}
	}
	
	var newtime = "";
	//var url1 = "https://"+CURRENT_IP+"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=convertoservertime&query=startdate="+startDate+"`starttime="+startTime+"`enddate="+endDate+"`endtime="+endTime+"`tZone="+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+timezone[4];
	var url1 = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=convertoservertime&query={"QUERY":[{"startdate":"'+startDate+'","starttime":"'+startTime+'","enddate":"'+endDate+'","endtime":"'+endTime+'","tZone":"'+timezone[0]+timezone[1]+timezone[2]+'^'+timezone[3]+timezone[4]+'"}]}';

    $.ajax({
        url: url1,
        dataType: 'html',
        async: false,
        success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			newtime =	json.RESULT[0].Return;
		}
	});
	return newtime;


}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getdevicetype 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 17,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : checks the device type if Dut, Server or Testtool
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getdevicetype(id){
	var devType = '';
	var URL = getURL('RM4')+'action=getdevicetype&query={"QUERY":[{"ids":"'+id+'"}]}';
	$.ajax({
		url: URL,
		async: false,
		dataType: 'html',
		success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

		//	devType = $.trim(data);
			if(json.DEVICE[0].DeviceType == "TestTool"){
				if(globalDeviceType != "Mobile"){
					openTestTool();	
				}else{
					$.mobile.changePage("../RM/RMTesttool.html",{
					transition: "flow",
					reverse: false,
					changeHash:true
				
					});
				}
			}		
		}
	});
	return devType;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : checkIfDutExists
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 17,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : checks if Dut exists
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function checkIfDutExists() {
	var url= 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=checkifdutexists&query=ids='+DeviceId;
	
	var ret = "";
	$.ajax({
	
		url: url,	
		dataType: 'html',
		async: false,
		success:function(data) {
			ret = $.trim(data);
		}
	});

	return ret;

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : createXMLdata 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : creates xml for resres devices 
 *  #  PARAMETERS    :qstr
 *  #
 *  #######################################################################
 *  */
function createXMLdata(qstr){
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/RM/RM.py?action=createxml&query='+qstr;
	var url = getURL('RM3')+'action=createxml&query={"QUERY":[{"query":"'+qstr+'"}]}';
	
	$.ajax({
		url: url,
		dataType: 'html',
		success:function(data){
		//	data = data.replace(/(\r\n|\n|\r)/gm,"");
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

//			var confirm1 = data.split(" ");
//			var confirmation = confirm1[0].split("^");
			var spdata = json.RESULT[0].Result.split( "=" );
			if(spdata[0].toLowerCase() == "resourceid" && spdata[1].split(',').length > 1){
				if(globalDeviceType == "Mobile"){
					alert('Device Successfully Reserved!');
					
				}else{
					alerts('Device Successfully Reserved!');
					loadDevicesHTML5();
				}
			}else{
					var rmRet = data.split(",");
					var rid = rmRet[0];
					var ofTime1 = rmRet[rmRet.length-4];
					var ofTime2 = rmRet[rmRet.length-3];
					var ofTime3 = rmRet[rmRet.length-2];
					var ofTime4 = rmRet[rmRet.length-1];
					var newstartinfo = converttoclient(ofTime1,ofTime2);
					var newendinfo = converttoclient(ofTime3,ofTime4);
					var newstartdate = "";
					var newstarttime = "";
					var newenddate = "";
					var newendtime = "";
					var datainfo = newstartinfo.split(",");
					var datainfo2 = newendinfo.split(",");
					var time= datainfo[0].replace(/-/g,":");
					var time2= datainfo2[0].replace(/-/g,":");
					var newdata = new Array();
					for (var g = 1; g < rmRet.length - 4; g++) {
						newdata.push(rmRet[g]);
					}
					$("#Alert").dialog({
						autoOpen: false,
						width: 300,
						height: 275,
						modal: true,
						closeOnEscape: false,
						open: function(event,ui){ $(".ui-dialog-titlebar-close",ui.dialog).hide(); },
						resizable: false,
						buttons: {
							"Continue": function() {
								$(this).dialog("close");
								// INSERT CONFIG
								alerts("Device Successfully Reserved");
								var cgiUrl = getURL('RM3')+'action=createxml';
									cgiUrl += '&query=' + globalUserName;
									cgiUrl += cgiIteInte;	
								var strDate, strTime, interval, iteration, endDate, endTime;
								$('#ReservationDevice input:checkbox[name="ReservationDevicesSel"]').each(function() {	
									if ($(this).is(":checked")){
										devid = $(this).val();
										strDate = $(this).parent().parent().find('td').eq(11).find('input').val();	
										strTime = $(this).parent().parent().find('td').eq(12).find('input').val();
										endDate = $(this).parent().parent().find('td').eq(16).find('input').val();
										endTime = $(this).parent().parent().find('td').eq(17).find('input').val();						
										cgiUrl += devid+'^'+strDate+','+strTime+','+endDate+','+endTime+ '*';
									}
								});

								$.ajax({
									url: cgiUrl,
									dataType: 'html',
									success: function(data) {
										if (globalPageRM == "ReservationDevices") {
											closeDialog();
										} else { 
											alerts("Device Successfully Reserved");
										  }
										//$('#restart12').removeClass('modal-overlay');
										StartOfReservationInfoForImage = {};
										EndOfReservationInfoForImage = {};
										StartOfReservationInfoForConfig = {};
										StartOfReservationInfoForPie = {};
										EndOfReservationInfoForConfig = {};
										startimagedetail = "false";
										startconfigdetail = "false";
										endimagedetail = "false";
										endconfigdetail = "false";
										StartImgArr = [];
										StartConArr = [];
										EndImgArr = [];
										EndConArr = [] ;
										emptyStartOfReservation();
										emptyEndOfReservation();
										setvaluesstartimage = false;
										setvaluesstartconfig = false;
										setvaluesendimage = false;
										setvaluesendconfig = false;
									//	resetReservedFilters();
										refreshAvailability = true;
					//					globalPageLoad[globalLoad] = "";
										globalTTPorts = {}
										selectedDevice = "";
										dateR1 = "";
										timeR1 = "";
										dateR2 = "";
										timeR2 = "";
										intervalR = "0";
										iterationR = "1";
									}
								});
							},
							"No": function() {
								$(this).dialog("close");
								for (var i = 0; i < newdata.length; i++ ) {
									releaseMatrix(rid,newdata[i],"");
								}
								if (qstr1 != ""){
									submitReservedPort(qstr1);
								}
						//		resetReservedFilters();
								loadDevicesHTML5();
								globalPageLoad[globalLoad] = "";
								globalTTPorts = {}
								selectedDevice = "";
								dateR1 = "";
								timeR1 = "";
								dateR2 = "";
								timeR2 = "";
								intervalR = "0";
								iterationR = "1";
							}
						}
					});
					var prompt = "The following device(s) are of conflict:<br/><br/>";
					for (var i = 0; i < newdata.length; i++ ) {
						prompt += $('#ReservationDevices'+newdata[i]).parent().next().next().find('span span').text() + "<br/>";
					}
					//prompt += "<br/>Offered Time Is: <b> "+datainfo[1]+" "+time+"</b> to <b>"+datainfo2[1]+" "+time2+"</b><br/><br/>Would you like to continue or queue the reservation?<br/><br/>";
					prompt += "<br/>Offered Time Is: <b> "+datainfo[1]+" "+time+"</b> to <b>"+datainfo2[1]+" "+time2+"</b><br/><br/>Would you like to continue?<br/><br/>";
					$('#Alert').empty().append(prompt);
					$('#Alert').dialog('open');
					$('.ui-dialog :button').blur();
				}
			}
		});		
}

var ctrDev = 0;
function queryCreateXMLData(){
	var qstr = "";
	var qstr1 = ""; 	
	var devIds2 = new Array();

	var ctrflag = 0;
	for (var i = 0; i < DeviceId.length; i++) {
		var devType = getdevicetype(DeviceId[i]);
		if (devType == "TestTool"){
			var newstartinfo = converttoServertime(StartDate[i],StartTime[i],EndDate[i],EndTime[i]);
			var newstartdate = "";
			var newstarttime = "";
			var newenddate = "";
			var newendtime = "";
			var datainfo = newstartinfo.split(",");
			var startinfo = datainfo[0].split(" ");
			newstartdate = startinfo[0];
	        newstarttime = startinfo[1];
			var endinfo = datainfo[1].split(" ");
	        newenddate = endinfo[0];
			newendtime = endinfo[1];

			if (ctrflag == 0){
                ctrflag = 1;
            } else {
                qstr = qstr + "^";
            }

			devIds2.push(DeviceId[i]);
			qstr = qstr + Recurrence[i];
			qstr = qstr + "|" + TimeInterval[i];
			qstr = qstr + "|" + DeviceId[i]; 
			qstr = qstr + "^" + DeviceReservation[i]; 
			qstr = qstr + "^" + newstartdate + "," + newstarttime + "," + newenddate + "," + newendtime;

		} else {
			var newstartinfo =converttoServertime(StartDate[i],StartTime[i],EndDate[i],EndTime[i]);
			var newstartdate = "";
			var newstarttime = "";
			var newenddate = "";
			var newendtime = "";
			var datainfo = newstartinfo.split(",");
			var startinfo = datainfo[0].split(" ");
			newstartdate = startinfo[0];
	        newstarttime = startinfo[1];
			var endinfo = datainfo[1].split(" ");
	        newenddate = endinfo[0];
			newendtime = endinfo[1];

			if (ctrflag == 0) {
                ctrflag = 1;
            } else {
                qstr = qstr + "`";
              }

			devIds2.push(DeviceId[i]);
			qstr = qstr + Recurrence[i];
			qstr = qstr + "|" + TimeInterval[i];
			qstr = qstr + "|" + DeviceId[i]; 
			qstr = qstr + "^" + DeviceReservation[i]; 
			qstr = qstr + "^" + newstartdate + "," + newstarttime + "," + newenddate + "," + newendtime + "*";
		}
	}
	qstr = globalUserName+"`"+qstr+qstr1;
	createXMLdata(qstr);
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : setManufacturer
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 17,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : dropdown for choosing manufaturer
 #  PARAMETERS    : value
 #
 #######################################################################
*/
function setManufacturer(value){
	enDisObjAutoD('Select');
	$('#devicetype').attr("disabled",false);
	if ( value == "networkingdevice" ) {
		$('#devicetype').empty();
		$('#devicetype').append('<option>Select</option>');
		$('#devicetype').append('<option value="cisco">Cisco</option>');
		$('#devicetype').append('<option value="juniper">Juniper</option>');
		$("#hasPartnerDevice").attr('disabled',false);
		$('#hostname').val('');
		$('#hostnamelabel').hide();
		$('#hostnamelabel2').hide();
	} else if ( value == "testtool" ) {
		$('#devicetype').empty();
		$('#devicetype').append('<option>Select</option>');
		$('#devicetype').append('<option value="n2x">Agilent</option>');
		$('#devicetype').append('<option value="ixia">Ixia</option>');
		$('#devicetype').append('<option value="spirent">Spirent</option>');
	 	$("#hasPartnerDevice").attr('disabled',false);
		$('#hostnamelabel').show();
		$('#hostnamelabel2').show();
	} else if ( value == "l1switch" ) {
		$('#devicetype').empty();
		$('#devicetype').append('<option>Select</option>');
		$('#devicetype').append('<option value="glx">Curtiss-Wright</option>');
		$('#devicetype').append('<option value="mrv">MRV</option>');
		$('#devicetype').append('<option value="onpath">OnPath</option>');
		$("#hasPartnerDevice").prop('checked',false);
		$("#hasPartnerDevice").attr('disabled',true);
		$('#partnerDevice').hide();
		$('#SlotTable').attr('style','display:none');
		addNew = false;
		$('#hostnamelabel').show();
		$('#hostnamelabel2').show();
	} else if ( value == "l2switch" ) {
		$('#devicetype').empty();
		$('#devicetype').append('<option>Select</option>');
		$('#devicetype').append('<option value="ciscoswitch">Cisco</option>');
		$("#hasPartnerDevice").prop('checked',false);
		$("#hasPartnerDevice").attr('disabled',true);
		$('#partnerDevice').hide();
		$('#SlotTable').attr('style','display:none');
		addNew = false;
		$('#hostname').val('');
		$('#hostnamelabel').hide();
		$('#hostnamelabel2').hide();
	} else if ( value == "terminalserver" ) {
		$('#devicetype').empty();
		$('#devicetype').append('<option>Select</option>');
		$('#devicetype').append('<option value="terminalserver">Cisco</option>');
		$("#hasPartnerDevice").prop('checked',false);
		$("#hasPartnerDevice").attr('disabled',true);
		$('#partnerDevice').hide();
		$('#SlotTable').attr('style','display:none');
		addNew = false;
		$('#hostname').val('');
		$('#hostnamelabel').hide();
		$('#hostnamelabel2').hide();
	} else if ( value == "empty" ) {
		$('#devicetype').attr("disabled",true);
		$('#devicetype').empty().append('<option>Select</option>');
		$("#hasPartnerDevice").prop('checked',false);
		$("#hasPartnerDevice").attr('disabled',true);
		$('#partnerDevice').hide();
		$('#SlotTable').attr('style','display:none');
		addNew = false;
		$('#hostname').val('');
		$('#hostnamelabel').hide();
		$('#hostnamelabel2').hide();
	}


}

/*
 #######################################################################
 #
 #  FUNCTION NAME : changeButton 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 20,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : checks the ip if it's existing
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function changeButton2(){
	var ipchk = $('#chassisIp').val();
	var urlx = getURL("ConfigEditor","JSON");
	var queryS = "{ 'QUERY': [{'ip': '"+ipchk+"'}]}";
	$.ajax({
		url: urlx,
		data: {
			action: "verifyip",
			query: queryS,
		},
		dataType : 'html',
		success: function(data){
			if(globalInfoType == "JSON"){
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var RESULT = dat2.RESULT;
				var Result = RESULT[0].Result

				var dt = Result.split(':');
				if(dt[0] == "true"){
					if(globalDeviceType=="Mobile"){
						// to be added
					}else{
						var msg = "Management Ip already exists in the Database\nDo you want to use the same Management IP?";
						var todo2 = "$('#chassisIp').val('');";
						alerts(msg,"","yesorno","",todo2);
					}
				}
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function includePartnerAutoDAdmin(obj){
	var devtype = $('#devicetype2 > option:selected').val();
	var optadd = "<option>Select</option>"
	switch(devtype){
		case "networkingdevice": case "testtool": case "terminalserver":
			optadd+="<option>L1 Switch</option>";
			optadd+="<option>L2 Switch</option>";
			optadd+="<option>Networking Device</option>";
		break;
		case "l1switch": case "l2switch":
			optadd+="<option>Networking Device</option>";
		break;
	}
	if($(obj).is(':checked')){
		$('#autoDNumConAdminCont').show();
		$('#partnerInfoAdminAutoD').show();
		$('#partdevtype').empty().append(optadd);

	}else{
		$('#autoDNumConAdminCont').hide();
		$('#partnerInfoAdminAutoD').hide();
		$('#partdevtype').empty().append("<option>Select</option>");
		$('#partSlotInfoAutoDAdminTbody').empty();
	}
	$("#partdevtype > option:contains('Select')").prop('selected',true);
	$("#partipadd > option:contains('Select')").prop('selected',true);
	$('#partSlotInfoAutoDAdminTbody').empty();
	$('#partdevhost').val('');
	$('#partdevmanu').val('');
	$('#partdevmodel').val('');
	$('#autoDNumConAdmin').val('');
	getAutoDPartAddAdmin();
//	showNewPartnerInfo()

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function chkPRequireAutoD(obj,iddis){
	var type = $(obj).attr('type');
	switch(type){
		case "text":
			if($(obj).val()!==""){ 
				$('#'+iddis).removeAttr('disabled'); 
			}else{
				if($('#'+iddis).attr('type')=='text'){
					$('#'+iddis).val('');
				}else if($('#'+iddis).attr('type')=='checkbox'){
					if($('#'+iddis).is(':checked')){
						$('#'+iddis).trigger('click');
					}
				}
				$('#'+iddis).attr('disabled','disabled');
			}
		break;
		case "checkbox":
			if($(obj).is(':checked')){
				$('#'+iddis).removeAttr('disabled'); 
			}else{
				if($('#'+iddis).attr('type')=='text'){
					$('#'+iddis).val('');
				}else if($('#'+iddis).attr('type')=='checkbox'){
					if($('#'+iddis).is(':checked')){
						$('#'+iddis).trigger('click');
					}
				}
				$('#'+iddis).attr('disabled','disabled');
			}
		break;
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getAutoDPartAddAdmin(obj){
	var opt = $('#partdevtype > option:selected').text();
	getAutoDSelectedPartnerAdd(opt,"admin");
	$("#partipadd > option:contains('Select')").prop('selected',true);
	$('#partSlotInfoAutoDAdminTbody').empty();
	$('#partdevhost').val('');
	$('#partdevmanu').val('');
	$('#partdevmodel').val('');
	$('#autoDNumConAdmin').val();
	$('#partdevhostC').hide();
	$('#partdevmanuC').hide();
	$('#partdevmodelC').hide();
	$('#partSlotInfoAutoDAdminTbody').empty();
	$('#partSlotAdminTable').hide();
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getAutoDPartInfoAdmin(obj){
	var opt = $('#partdevtype > option:selected').text();
	showNewPartnerInfo(opt,"admin");

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function enDisObjAutoD(val){
	var slct = $('#devicetype > option:selected').text();
	if(val!=undefined){
		if(val!=""){ slct = val; }
	}
	$('#hostname').val('');
	$('#chassisIp').val('');
	$('#checkIpAutoD').prop('checked',false);
	$('#chassisIpPort').val('');
	$('#chassisConIp').val('');
	$('#chassisConPort').val('');
	$('#addusername').val('');
	$('#addpassword').val('');
	$('#devdomainAutoD > option:contains("Select")').prop('selected',true);
	$('#checkPartPAdmin').prop('checked',false);
	$('#checkOptVAdmin').prop('checked',false);
	$('#adminHTypeAutoD > option:contains("Select")').prop('selected',true);
	showHOptValAutoDAdmin();
	switch(slct){
		case "Select":
			$('#hostname').attr('disabled',true);
			$('#chassisIp').attr('disabled',true);
			$('#checkIpAutoD').attr('disabled',true);
			$('#chassisIpPort').attr('disabled',true);
			$('#chassisConIp').attr('disabled',true);
			$('#chassisConPort').attr('disabled',true);
			$('#addusername').attr('disabled',true);
			$('#addpassword').attr('disabled',true);
			$('#devdomainAutoD').attr('disabled',true);
			$('#checkPartPAdmin').attr('disabled',true);
			$('#checkOptVAdmin').attr('disabled',true);
			$('#adminHTypeAutoD').attr('disabled',true);
		break;
		default:
			$('#hostname').attr('disabled',false);
			$('#chassisIp').attr('disabled',false);
			$('#chassisConIp').attr('disabled',false);
			$('#addusername').attr('disabled',false);
			$('#addpassword').attr('disabled',false);
			$('#devdomainAutoD').attr('disabled',false);
			$('#checkOptVAdmin').attr('disabled',false);
			$('#adminHTypeAutoD').attr('disabled',false);
		break;
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function showHOptValAutoDAdmin(){
	$('#chassisAuxIp').val('');
	if($('#checkAuxIpAutoD').is(':checked')){
		$('#checkAuxIpAutoD').trigger('click');
	}
	if($('#checkOptVAdmin').is(':checked')){
		$('#autoDOptValAdmin').show();
	}else{
		$('#autoDOptValAdmin').hide();
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getHostValid 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 20,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : checks the hostname if it's existing or not
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getHostValid(){ 
	var newhostname = $('#Devicehostname').val();
	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompletePythonCGI/FastQueryCgi.py?action=gethostvalid&query=host='+newhostname;
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = $.trim(data);	
			if(globalDeviceType == "Mobile"){	
				if(data == "false" || data == false){
					$('#DeviceConsoleIp').textinput('enable');
					$('#DeviceManagementIp').textinput('enable');
					$('#DevicesoftwareVersion').textinput('enable');
					$('#DevicemodelType').textinput('enable');
					$('#Devicedescription').textinput('enable');
					$('#Devicemanufacturer').textinput('enable');
					$('#DeviceserialNumber').textinput('enable');
					$('#Portduplexity').textinput('enable');
					$('#Portbandwidth').textinput('enable');
					$('#Portmtu').textinput('enable');
					$('#Portmodel').textinput('enable');
					$('#PortmediaType').textinput('enable');
					$('#portName').textinput('enable');
					$('#Portspeed').textinput('enable');
					$('#PorthardwareVersion').textinput('enable');
					$('#Portdescription').textinput('enable');
					$('#Portslotnumber').selectmenu('enable');
					$('#Modulehardwareinfo').textinput('enable');
					$('#Moduledescription').textinput('enable');
					$('#Modulehsoftwareinfo').textinput('enable');
					$('#SlotsoftwareVersion').textinput('enable');
					$('#SlothardwareVersion').textinput('enable');
					$('#SlotserialNumber').textinput('enable');
					$('#Slotdescription').textinput('enable');
					$('#SlotproductNumber').textinput('enable');
				}
			}else{
				if(globalDeviceType == "Mobile"){
					alert('Hostname already exists in the database.');
				}else{
					alerts('Hostname already exists in the database.');
				}
			}
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterReservationReserve 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 22,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Reservation Reserve table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterReservationReserve(){
	var $rows = $('#reservationRM-table tr:gt(0)');
	$('.ReservedFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterReserved option:selected').text();
		var colval = $('#filterReserved').val();
		var colnum = '';
		if(colval == "hostName"){
			colnum = 2
		}else if(colval == "user"){
			colnum = 9
		}else if(colval == "domainname"){
			colnum = 3
		}else if(colval == "managementip"){
			colnum = 4
		}else if(colval == "consoleip"){
			colnum = 5
		}else if(colval == "model"){
			colnum = 6 
		}else if(colval == "type"){
			colnum = 15
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterReservationConnectivity
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 22,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Reservation Connectivity table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterReservationConnectivity(){
	var $rows = $('#RMConnectivity-table tr:gt(0)');
	$('.ConnectivityFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterConnectivity option:selected').text();
		var colval = $('#filterConnectivity').val();
		var colnum = '';
		if(colval == "hostName"){
			colnum = 1
		}else if(colval == "description"){
			colnum = 2
		}else if(colval == "switchhostname"){
			colnum = 8
		}else if(colval == "switchdescription"){
			colnum = 9
		}else if(colval == "devicehostname"){
			colnum = 15
		}else if(colval == "devicedescription"){
			colnum = 16
		}else if(colval == "user"){
			colnum = 17
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterReservationPort
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Reservation Port table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterReservationPort(){
	var $rows = $('#RMPort-table tr:gt(0)');
	$('.PortFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterPort option:selected').text();
		var colval = $('#filterPort').val();
		var colnum = '';
		if(colval == "hostName"){
			colnum = 2
		}else if(colval == "managementip"){
			colnum = 3
		}else if(colval == "model"){
			colnum = 4
		}else if(colval == "portname"){
			colnum = 5
		}else if(colval == "user"){
			colnum = 8
		}else if(colval == "type"){
			colnum = 10
		}else if(colval == "physicalporttype"){
			colnum = 11
		}else if(colval == "portspeed"){
			colnum = 12
		}else if(colval == "bandwidth"){
			colnum = 13
		}else if(colval == "linetype"){
			colnum = 14
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterReservationDevices
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Reservation Devices table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterReservationDevices(){
	var $rows = $('#RMDevices-table tr:gt(0)');
	$('.DevicesFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterDevices option:selected').text();
		var colval = $('#filterDevices').val();
		var colnum = '';
		if(colval == "hostName"){
			colnum = 1
		}else if(colval == "managementip"){
			colnum = 2
		}else if(colval == "consoleip"){
			colnum = 3
		}else if(colval == "manufacturer"){
			colnum = 4
		}else if(colval == "model"){
			colnum = 5
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterReservationHistory
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Reservation History table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterReservationHistory(){
	var $rows = $('#RMHistory-table tr:gt(0)');
	$('.HistoryFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterHistory option:selected').text();
		var colval = $('#filterHistory').val();
		var colnum = '';
		if(colval == "hostName"){
			colnum = 2
		}else if(colval == "managementip"){
			colnum = 3
		}else if(colval == "manufacturer"){
			colnum = 4
		}else if(colval == "model"){
			colnum = 5
		}else if(colval == "user"){
			colnum = 6
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterSchedHistory
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Scheduler History table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterSchedHistory(){
	var $rows = $('#RMHistorySched-table tr:gt(0)');
	$('.SchedHistFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterSchedHist option:selected').text();
		var colval = $('#filterSchedHist').val();
		var colnum = '';
		if(colval == "eventid"){
			colnum = 1
		}else if(colval == "configname"){
			colnum = 2
		}else if(colval == "eventdesc"){
			colnum = 3
		}else if(colval == "username"){
			colnum = 4
		}else if(colval == "status"){
			colnum = 7
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterEventSched
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Event Scheduler table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterEventSched(){
	var $rows = $('#RMEventSched-table tr:gt(0)');
	$('.SchedEventFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterSchedEvent option:selected').text();
		var colval = $('#filterSchedEvent').val();
		var colnum = '';
		if(colval == "eventid"){
			colnum = 1
		}else if(colval == "configname"){
			colnum = 2
		}else if(colval == "userid"){
			colnum = 3
		}else if(colval == "username"){
			colnum = 4
		}else if(colval == "device"){
			colnum = 7
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : filterManageDevices
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Manage Devices table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterManageDevices(){
	var $rows = $('#RMManageDevice-table tr:gt(0)');
	$('.ManageFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterManage option:selected').text();
		var colval = $('#filterManage').val();
		var colnum = '';
		if(colval == "hostname"){
			colnum = 2
		}else if(colval == "zone"){
			colnum = 3
		}else if(colval == "domain"){
			colnum = 4
		}else if(colval == "managementip"){
			colnum = 6
		}else if(colval == "managementinterface"){
			colnum = 7
		}else if(colval == "macaddress"){
			colnum = 8
		}else if(colval == "consoleip"){
			colnum = 9
		}else if(colval == "manufacturer"){
			colnum = 10
		}else if(colval == "model"){
			colnum = 11
		}else if(colval == "serialno"){
			colnum = 12
		}else if(colval == "techsupport"){
			colnum = 14
		}else if(colval == "discovery"){
			colnum = 15
		}else if(colval == "cpuspeed"){
			colnum = 16
		}else if(colval == "systemmemory"){
			colnum = 17
		}else if(colval == "nvram"){
			colnum = 18
		}else if(colval == "osversion"){
			colnum = 19
		}
    	$rows.show().filter(function() {
			if(colnum != ''){
        		text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
        		text = $(this).text().replace(/\s+/g, ' ');
			}
        	return !reg.test(text);
    	}).hide();

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : autoRefreshTable
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : function that autorefresh all tables
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function autoRefreshTable(){
	var command = "";
	if(globalCurrPage != "Resource Management"){
		return
	}
	clearInterval(autoRefresh);
	if(globalPageRM == "ReservationReserve"){
		command = "loadReserve()";
	}else if(globalPageRM == "ReservationConnectivity"){
		command = "loadConnectivity()";
	}else if(globalPageRM == "ReservationHistory"){
		command = "loadHistory()";
	}else if(globalPageRM == "ReservationPort"){
		command = "loadPort()";
	}else if(globalPageRM == "SchedulerHistory" ){
		command = "loadHistorySched()";
	}else if(globalPageRM == "SchedulerEvent"){
		command = "loadEventSched()";
	}else if(globalPageRM == "ConfigurationInfo"){
		command = "loadHistoryScheduler2()";
	}else{
		command = "";
	}
	autoRefresh = setInterval(command,60000);
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getSystemInfo
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for system advanced filter
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getSystemInfo(){

	var domain = ""
	var retData = '';
//	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getSysInfo&query=domain='+domain+'`user='+globalUserName;
	var url = getURL('RM4')+'action=getSysInfo&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data){

			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var system = json.data[0].row;
			retData = system;

		}
	});

	return retData;

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getRouteInfo
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for getting route info in advanced filter
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getRouteInfo(){

	var domain = ""
	var retVal = '';
//	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getRouteInfo&query=domain='+domain+'`user='+globalUserName;
	var url = getURL('RM4')+'action=getRouteInfo&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var route = json.root[0].data;
			retVal = route;
		}
	});

	return retVal;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getEmbedInfo
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for getting embed info
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getEmbedInfo(){

	var domain = ""
	var retVal = '';
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getEmbedInfo&query=domain='+domain+'`user='+globalUserName;
	var url = getURL('RM4')+'action=getEmbedInfo&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url:url,	
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var embed = json.root[0].data;
			retVal = embed;

		}
	});

	return retVal;

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getLineCardInfo
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for line card advanced filter
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getLineCardInfo(){

	var domain = ""
	var retVal = '';
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getLineInfo&query=domain='+domain+'`user='+globalUserName;
	var url = getURL('RM4')+'action=getLineInfo&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url: url,	
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var line = json.root[0].data;
			retVal = line;

		}
	});

	return retVal;

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getModuleInfo
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for getting module info in advanced filter
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getModuleInfo(){

	var domain = ""
	var retVal = '';
	//var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getModuleInfo1&query=domain='+domain+'`user='+globalUserName;
	var url = getURL('RM4')+'action=getModuleInfo1&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var module = json.root[0].data;
			retVal = module;
		}
	});

	return retVal;

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getPortInfo
 #  AUTHOR        : Angeline Bringas
 #  DATE          : January 24,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for getting port info 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getPortInfo(){
	var domain = ""
	var retVal = '';
	//var url= 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getPortInfo&query=domain='+domain+'`user='+globalUserName;
	var url= getURL('RM4')+'action=getPortInfo2&query={"QUERY":[{"domain":"'+domain+'","user":"'+globalUserName+'"}]}';
	$.ajax({
		url:url,	
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var port = json.data[0].row;
			retVal = port;
		}
	});

	return retVal;

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : showMore
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : January 24,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : function that adds 10 data on the table everytime it was clicked. (MOBILE only)
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function showMore(){
	showMoreInfo += 10;
	if(globalPageRM == 'ReservationReserve'){
		loadReserve();
	}else if(globalPageRM == 'ReservationConnectivity'){
		loadConnectivity();
	}else if(globalPageRM == 'ReservationHistory'){
		loadHistory();
	}else if(globalPageRM == 'ReservationPort'){
		loadPort();
	}else if(globalPageRM == 'ReservationDevices'){
		loadDevices();
	}else if(globalPageRM == 'SchedulerEvent'){
		loadEventSched();
	}else if(globalPageRM == 'SchedulerHistory'){
		loadHistorySched();
	}else if(globalPageRM == 'ManageDevices'){
		loadManage();
	}

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : getResLimit
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 6,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : function for getting the reservation limit of a user
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function getResLimit(){
	var ret = "";

//	var	url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getreslimit&query=user='+globalUserName;
	var	url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=getreslimit&query={"QUERY":[{"user":"'+globalUserName+'"}]}';
	$.ajax({
		url:url,	
		dataType: 'html',
		async: false,
		success:function(data) {
			ret = $.trim(data);
		}
	});

	return ret;

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : changeReservationView
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 5,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : changes table view into calendar view and vice versa
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function changeReservationView(){
	var url	= 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getreservecalendarview&query=user='+globalUserName;
		$.ajax ({
		url: url,
		dataType: 'html',
		success: function (src) {
			setCalendarData(src);
			}
		});
	
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : rmHighlight
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 6,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : function to retain the highlight when table was refreshed
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function rmHighlight(){
	if(globalPageRM == 'ReservationReserve'){
		var ctr;
		ctr = 0;
		$('.trReserved').each(function(){
		var val = $(this).attr("rIds");

			for(var i = 0; i < globalResourceId.length; i++){
				if(val == globalResourceId[i]){
					$(this).addClass('highlight');
					ctr++
					var deviceid = $(this).attr("devId");
					$('#ReservationReserve_'+deviceid+'_'+globalResourceId[i]).prop('checked',true);
				}	
			}
		
		});
		if(ctr == 0){
			$('#ReserveButtons').hide();	
		}else{
			$('#ReserveButtons').show();
		}
	}else if(globalPageRM == 'ReservationConnectivity'){
		var ctr;
		ctr = 0;
		$('.trConnectivity').each(function(){
		var val = $(this).attr("pId");

			for(var i = 0; i < PortReservationId.length; i++){
				if(val == PortReservationId[i]){
					$(this).addClass('highlight');
					ctr++
					$('#ReservationConnectivity_'+PortReservationId).prop('checked',true);

				}	
			}
		
		});
		if(ctr == 0){
			$('#ConnectivityButtons').hide();	
		}else{
			$('#ConnectivtiyButtons').show();
		}
	}
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : showLinkSanityLogs
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 6,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : shows link sanity logs
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */

function showLinkSanityLogsRM(){
	$('#eventNewDevicelogstext').empty().append("\n"+"Config Name: "+ConfigName1+"\n");
	$('#eventNewDevicelogstext').append("==================START LOGS===============\n\n");
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=getEventID&query=resId="+globalResourceId+"`devId="+DeviceId;

	$.ajax({
		//url : "../php/dbm_receiver.php?action=getEventID&resId="+ResourceId1+"&devId="+devId,
		url: url,
		dataType: 'html',
//		data = $.trim(data);
		success : function (data) {
			if(data == "0" || data == 0){
				if(globalDeviceType == "Mobile"){
					alert("No Link Sanity Logs available.");
					return;
				}else{
					alerts("No Link Sanity Logs available.");
					return
				}
			}
			$("#eventNewDevicelogstext").append(data);
			$('#eventNewDevicelogstext').scrollTop($('#eventNewDevicelogstext').height());
				

		}
	});


}
function enableInputFields() {
	erased = 0;
	recurrence = "";
	var clname = "";
	clname = "resres";

	if ($('#toAppExt').val() == "Specific") {
		$('input[name="specDevSel"]').each(function() {
    		if ($(this).is(':checked')) {
        		//globDev = $(this).val();
        		if ($.inArray($(this).val(),globalDevArr) == -1) {
					globalDevArr.push($(this).val());
				}
    		}
		});
	} else {
		globDev = "all";	
		$('input[name="specDevSel"]').each(function() {
        	if ($.inArray($(this).val(),globalDevArr) == -1) {
				globalDevArr.push($(this).val());
			}
		});
	  }

	if (globalPageRM == "ReservationReserve") {
		if ($('#iterExt').val() == "Specific") {
			$('input[name="specIterSel"]').each(function() {
    			if ($(this).is(':checked')) {
        			//globDev = $(this).val();
        			if ($.inArray($(this).val(),globalIterArr) == -1) {
						globalIterArr.push($(this).val());
					}
    			}
			});
		} else {
			globIter = "all";
			if ($('#iterExt').parent().parent().is(':visible') == true) {
				$('input[name="specIterSel"]').each(function() {
    	    		if ($.inArray($(this).val(),globalIterArr) == -1) {
						globalIterArr.push($(this).val());
    				}
				});
			} else {
				$('.'+clname).each(function() {
					if ($(this).parent().parent().hasClass('highlight')) {
        				if ($.inArray($(this).attr('iter'),globalIterArr) == -1) {
							globalIterArr.push($(this).attr('iter'));
    					}
					}
				});
			  }
	  	}
	} else {
		globIter = "all";
		$('.'+clname).each(function() {
			if ($(this).parent().parent().hasClass('highlight')) {
        		if ($.inArray($(this).attr('iter'),globalIterArr) == -1) {
					globalIterArr.push($(this).attr('iter'));
    			}
			}
		});
	  }


	//SPECIFIC DEVICE - SPECIFIC ITERATION
	
	//ALL DEVICES - SPECIFIC ITERATION
	
	//SPECIFIC DEVICE - ALL ITERATION
	
	//ALL DEVICES - ALL ITERATION
	var indices = new Array("8","9","13","17","18","14");
   	if (globDev == 'all') {
		if (globIter == 'all') {
			$('.'+clname).each(function() {
				if ($(this).parent().parent().hasClass('highlight')) {
					var key = $(this).attr('did2').split("_")[0]+"*"+$(this).attr('iter')+"*"+$(this).attr('did2').split("_")[1];
					var t = 0;
					var str = "";
					for (var h = 0; h < indices.length; h++) {
						if (h == indices.length - 1) {
							str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val());
							recurrence = $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val());
						} else {
							str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val())+"*";
						  } 
					}
					globalReservationInfo[key] = str;
				    $(this).parent().parent().find('td').eq(8).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(9).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(17).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(18).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(13).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(14).find('input').removeAttr("disabled");
					//$(this).parent().parent().find('td').eq(11).find('input').attr('disabled',false);
				} else {
					if ($(this).is(':checked' == false)) {
						$(this).attr('disabled',true);
					}
				  } 
			});
		} else {
			$('.'+clname).each(function() {
				if ($(this).parent().parent().hasClass('highlight')) {
					if ($.inArray($(this).attr('iter'),globalIterArr) != -1) {
						var key = $(this).attr('id').split("_")[1]+"*"+$(this).attr('iter')+"*"+$(this).attr('id').split("_")[2];
						var t = 0;
						var str = "";
						for (var h = 0; h < indices.length; h++) {
							if (h == indices.length - 1) {
								str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val());
							} else {
								str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val())+"*";
						  	  } 
						}
						globalReservationInfo[key] = str;
						$(this).parent().parent().find('td').eq(8).find('input').removeAttr("disabled");
				    	$(this).parent().parent().find('td').eq(9).find('input').removeAttr("disabled");
				 		$(this).parent().parent().find('td').eq(17).find('input').removeAttr("disabled");
				    	$(this).parent().parent().find('td').eq(18).find('input').removeAttr("disabled");
				    	$(this).parent().parent().find('td').eq(13).find('input').removeAttr("disabled");
				    	$(this).parent().parent().find('td').eq(14).find('input').removeAttr("disabled");
						var chosenIter = $(this).parent().parent().find('td').eq(12).find('input').val();
						if (chosenIter == 1) {
							$(this).parent().parent().find('td').eq(14).find('input').attr('disabled',false);
						}
					}
				} else if ($(this).parent().parent().hasClass('highlight') == false) {
					if ($(this).prop('checked',false)) {
						$(this).attr('disabled',true);
					}
				  } 
			});

		  }
	} else {
		if (globIter == 'all') {
			$('.'+clname).each(function() {
				if ($(this).parent().parent().hasClass('highlight') && ($.inArray($(this).parent().parent().find('td').eq(1).text(),globalDevArr) != -1)) {
					var key = $(this).attr('id').split("_")[1]+"*"+$(this).attr('iter')+"*"+$(this).attr('id').split("_")[2];
					var t = 0;
					var str = "";
					for (var h = 0; h < indices.length; h++) {
						if (h == indices.length - 1) { 
							str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val());
						} else { 
							str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val())+"*";
						  } 
					}
					globalReservationInfo[key] = str;
					$(this).parent().parent().find('td').eq(8).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(9).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(17).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(18).find('input').removeAttr("disabled");
				   	$(this).parent().parent().find('td').eq(13).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(14).find('input').removeAttr("disabled");

/*		       	    $(this).parent().parent().find('td').eq(7).find('input').attr('disabled',false);
				    $(this).parent().parent().find('td').eq(8).find('input').attr('disabled',false);
    			    $(this).parent().parent().find('td').eq(15).find('input').attr('disabled',false);
       				$(this).parent().parent().find('td').eq(16).find('input').attr('disabled',false);
					$(this).parent().parent().find('td').eq(11).find('input').attr('disabled',false);
					$(this).parent().parent().find('td').eq(12).find('input').attr('disabled',false);*/
				} else { 
					if ($(this).prop('checked',false)) {
						$(this).attr('disabled',true);
					}
				  } 
			});
		} else {
			$('.'+clname).each(function() {
				if ($(this).parent().parent().hasClass('highlight') && ($.inArray($(this).parent().parent().find('td').eq(1).text(),globalDevArr) != -1) && ($.inArray($(this).attr('iter'),globalIterArr) != -1)) {
					var key = $(this).attr('id').split("_")[1]+"*"+$(this).attr('iter')+"*"+$(this).attr('id').split("_")[2];
					var t = 0;
					var str = "";
					for (var h = 0; h < indices.length; h++) {
						if (h == indices.length - 1) {
							str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val());
						} else {
							str += $.trim($(this).parent().parent().find('td').eq(indices[h]).find('input').val())+"*";
						  } 
					} 
					globalReservationInfo[key] = str;
					$(this).parent().parent().find('td').eq(8).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(9).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(17).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(18).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(13).find('input').removeAttr("disabled");
				    $(this).parent().parent().find('td').eq(14).find('input').removeAttr("disabled");
						
					var chosenIter = $(this).parent().parent().find('td').eq(13).find('input').val();
					if (chosenIter == 1) {
						$(this).parent().parent().find('td').eq(14).find('input').attr('disabled',false);
					}
				} else if ($(this).parent().parent().hasClass('highlight') == false) {
					if ($(this).prop('checked',false)) {
						$(this).attr('disabled',true);
					}
				  } 
			});

		  }
	  }


}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : reserveExtendApply
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 25,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : to apply the new time
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function reserveExtendApply(){
	var clname = "";
	clname = "resres";
	var starttime = "";
	var startdate = "";
	var enddate = "";
	var endtime = "";
	var interval = "";
	var iteration = "";
	var device = "";
	$('.'+clname).each(function() {
		if ($(this).parent().parent().hasClass('highlight')) {
       	    startdate = $.trim($(this).parent().parent().find('td').eq(8).find('input').val());
	       	starttime = $.trim($(this).parent().parent().find('td').eq(9).find('input').val());
        	enddate = $.trim($(this).parent().parent().find('td').eq(17).find('input').val());
       		endtime = $.trim($(this).parent().parent().find('td').eq(18).find('input').val());
       		interval = $.trim($(this).parent().parent().find('td').eq(13).find('input').val());
			resid = $(this).attr('rid');
			iterNum = $(this).attr('iter');
    	}
	});
/*	if (startdate == "" || starttime == "" || enddate == "" || endtime == "") {
		alert("Iteration no longer available. Please choose another iteration to extend.");
		return;
	}

	if (interval == "") {
		alert("Please provide interval.input");
		return;
	}
	
	if (iteration == "") {
		alert("Please provide iteration input.");
		return;
	}*/
	var isvalid = verifyDateTime3(startdate,starttime,enddate,endtime);
		if (isvalid == 2) {
			if (globIter == "all") {
				globIter += "^"+iterNum;
			}
		}else {
			return;
	    }
	
		var todo = "";
		for (var g = 0; g < globalDevArr.length; g++) {
			for (var y = 0; y < globalIterArr.length; y++) {
				if (y == globalIterArr.length - 1 && g == globalDevArr.length - 1) {
					todo = "disableRMButtons();$('#reservationRM-table').find('input').removeAttr('checked');globalPageIter={};dialog('destroy');";
				}
				if (globalIterArr.length > 1) { 
					var key = globalDevArr[g]+"*"+globalIterArr[y]+"*"+resid;
					startdate= globalReservationInfo[key].split("*")[0];
					starttime = globalReservationInfo[key].split("*")[1];
					enddate = globalReservationInfo[key].split("*")[3];
					endtime = globalReservationInfo[key].split("*")[4];
					interval = globalReservationInfo[key].split("*")[2];
				}
				var sd = "";
				var st = "";
				var ed = "";
				var et = "";
				var inte = "";
				var str = "";
				for (var x = 0; x < globalDevArr.length; x++) {
					for (var f = 0; f < globalIterArr.length; f++) {
						if (globalDevArr[x] == globalDevArr[g] && globalIterArr[f] != globalIterArr[y] ) {
							var key1 = globalDevArr[x]+"*"+globalIterArr[f]+"*"+resid;
							sd = globalReservationInfo[key1].split("*")[0];
							st = globalReservationInfo[key1].split("*")[1];
							ed = globalReservationInfo[key1].split("*")[3];
							et = globalReservationInfo[key1].split("*")[4];
							inte = globalIterArr[f];
								str += sd+" "+st+"^"+ed+" "+et+"^"+inte+"^"+globalDevArr[g]+"*";
						}
					}
				}
			sendRequestToCGI(startdate,starttime,enddate,endtime,globalIterArr[y],resid,globalDevArr[g],interval,todo,str);
		}
	}
}
function sendRequestToCGI(startDate,startTime,endDate,endTime,iteration,resourceid,device,interval,todo,str) {

	var clname = "";
	clname = "resres";
	$('.'+clname).each(function() {
		if ($(this).parent().parent().hasClass('highlight')) {
			recurrence = $.trim($(this).parent().parent().find('td').eq(14).find('input').val());
		}
	});
	var qstr = "action=reserveapply&query={'RESERVATION':[{";
	qstr = qstr+"'resourceid':'"+resourceid;
	var newstartinfo = converttoServertime(startDate,startTime,endDate,endTime);
	var newstartdate = "";
	var newstarttime = "";
	var newenddate = "";
	var newendtime = "";
	var datainfo = newstartinfo.split(",");
	var startinfo = datainfo[0].split(" ");
	newstartdate = startinfo[0];
    newstarttime = startinfo[1];
	var endinfo = datainfo[1].split(" ");
    newenddate = endinfo[0];
	newendtime = endinfo[1];
	qstr = qstr+ "','startdate':'"+newstartdate+"','starttime':'"+newstarttime; 
	qstr = qstr+ "','enddate':'"+newenddate+"','endtime':'"+newendtime; 
	qstr = qstr+ "','iteration':'"+Iteration+"','device':'"+device+"','interval':'"+Interval+"','extra':'"+str+"','recurrence':'"+recurrence+"'}]}";
	sendReserveApply(qstr,todo);
}
var msgArr = new Array();
var msgArr2 = new Array();
var msgArr3 = new Array();
var msgArr4 = new Array();

function sendReserveApply(qstr,todo) {
	var cgiUrl = getURL('RM3')+qstr;
	$.ajax({
	
		url: cgiUrl,
		dataType: 'html',
		async: false,
		timeout: 60000,
		success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			data = $.trim(data);
			if(json.RESULT[0].Result == "1" || json.RESULT[0].Result == "2") {
				var device = qstr.split("&")[1].split(",")[6].split("=")[1];
				var iter = qstr.split("&")[1].split(",")[5].split("=")[1];
				var res = qstr.split("&")[1].split(",")[0].split("=")[2];
				var host = $('#ReservationReserve_'+device+'_'+res).parent().parent().find('td').eq(3).find('span span').text();
				if (json.RESULT[0].Result == "2") {
					if ($.inArray(host,msgArr4)) {
						msgArr4.push(host);			
					}
				} else {
					msgArr.push(host+" (Iteration Number: "+iter+")");			
				  }	
				if (todo!="") {	
					eval(todo);
					//globalPageLoad[globalLoad] = "";
					globalPageIter = {};
					enableReservationButtons();
					//refreshAvailability = true;
					if (msgArr.length > 0) {
						var prompt1 = "The following device(s) were successfully updated:<br/><br/>";
						for (var c=0; c < msgArr.length; c++){
							prompt1 += msgArr[c] + "<br/>";
						} 
						if (msgArr2.length > 0) {
							prompt1 += "<br/>The following device(s) were not updated:<br/><br/>";
							for (var c=0; c < msgArr2.length; c++){
								prompt1 += msgArr2[c] + "<br/>";
							}
						} 
						if (msgArr4.length > 0) {
							prompt1 += "<br/>The iteration for the following device(s) are updated:<br/><br/>";
							for (var c=0; c < msgArr4.length; c++){
								prompt1 += msgArr4[c] + "<br/>";
							}
						}
		
						$("#Alert").dialog({
            			    autoOpen: false,
			                width: 300,
			                height: 200,
			                resizable: false,
			                modal: true,
							closeOnEscape: false,
					    	open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
            			    buttons: {
			                    "OK": function() {
        			                $(this).dialog("close");
            	    	        }
                			}
			            });
	
						$('#Alert').dialog("open");
	        			$('#Alert').empty().append(prompt1);
						$('.ui-dialog :button').blur();
					} else if (msgArr2.length > 0) {
						var prompt1 = "The following device(s) were not updated:<br/><br/>";
        		        for (var c=0; c < msgArr2.length; c++){
                		    prompt1 += msgArr2[c] + "<br/>";
		                }
						$("#Alert").dialog({
                			autoOpen: false,
			                width: 300,
    			            height: 200,
        	    		    resizable: false,
		            	    modal: true,
							closeOnEscape: false,
						    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		                	buttons: {
        		            	"OK": function() {
                		        	$(this).dialog("close");
									$('#restart12').removeClass('modal-overlay');
                        		}
		                	}	
	    		        });

    	        		$('#Alert').dialog("open");
		        	    $('#Alert').empty().append(prompt1);
						$('.ui-dialog :button').blur();

					  } else if (msgArr4.length > 0) {
							var prompt1 = "<br/>The iteration for the following device(s) are updated:<br/><br/>";
							for (var c=0; c < msgArr4.length; c++){
								prompt1 += msgArr4[c] + "<br/>";
							}
							$("#Alert").dialog({
    	            			autoOpen: false,
				                width: 300,
    				            height: 200,
        	    			    resizable: false,
		            		    modal: true,
								closeOnEscape: false,
						    	open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			                	buttons: {
    	    		            	"OK": function() {
        	        		        	$(this).dialog("close");
										$('#restart12').removeClass('modal-overlay');
            	            		}
		        	        	}	
	    		    	    });

    	        			$('#Alert').dialog("open");
			        	    $('#Alert').empty().append(prompt1);
							$('.ui-dialog :button').blur();
					    }
					if ((msgArr.length > 0 || msgArr3.length > 0 || msgArr4.length > 0) && msgArr2.length == 0) {
						updateCurrentExtension();
					}
					msgArr = [];
					msgArr2 = [];
					msgArr3 = [];
					msgArr4 = [];

				}
				
			} else {
				var device = qstr.split("&")[1].split(",")[6].split("=")[1];
				var iter = qstr.split("&")[1].split(",")[5].split("=")[1];
				var res = qstr.split("&")[1].split(",")[0].split("=")[2];
				var host = $('#ReservationReserve_'+device+'_'+res).parent().parent().find('td').eq(3).find('span span').text();
				var msg = "";
				var msg2 = "";
				switch (json.RESULT[0].Result) {
					case "nomsg": msg = "Failure to load resources."; break;
					case "incompletemsg": msg = "Failure to load resources."; break;
					case "check1": msg = "Start Time should not be greater than End Time."; break;
					case "check2": msg = "Reservation Time should be equal to or greater than 10 minutes."; break;
					case "check3": msg = "New Start Time should be equal to or greater than the committed start time."; break;
					case "check4": msg = "Conflict found before extending the reservation time."; break;
					case "check5": msg = "Conflict found between other existing iteration(s)."; break;
					case "check6": msg = "Conflict found between device(s) existing reservation"; break;
					case "check8": msg = "Reservation is currently running for the first iteration"; break;
					case "check9": msg = "New End Time should be greater than the current time with at least 10 minutes or one of the selected iteration(s) already expired"; break;
					case "check10": msg = "Iteration is already active"; break;
					case "check11": msg2 = "1"; break;
					case "check13": msg = "Current user already exceeded extended reservation limit"; break;
					case "check14": msg = "Added iterations are conflict with other reservation"; break;
					case "check15": msg = "Iteration already expired"; break;
				}
				if ( msg != "" ) {
					msgArr2.push(host+" with Iteration Number: "+iter+" fails due to: "+msg);
				} else if ( msg2 != "" ) {
					msgArr3.push(host+" (Iteration Number: "+iter+")");				
				}
				if (todo != "") {
					$('#reservationRM-table').find('input').removeAttr('checked');
					//$('.ResReserveonselection').parent().removeClass('highlight');
					$('.ResReserveonselection').each(function() {
						$(this).prop('checked',false);
						$(this).parent().removeClass('highlight');
						$(this).parent().find('td').eq(7).find('input').attr('disabled','true');
		    	    	$(this).parent().find('td').eq(8).find('input').attr('disabled','true');
			    	    $(this).parent().find('td').eq(10).find('input').attr('disabled','true');
			    	    $(this).parent().find('td').eq(11).find('input').attr('disabled','true');
        		    	$(this).parent().find('td').eq(13).find('input').attr('disabled','true');
	    	        	$(this).parent().find('td').eq(14).find('input').attr('disabled','true');
					});
					//alert(msg);
					loadReserve();
					globalPageIter = {};
					//refreshAvailability = true;
					//autoUpdate(refreshFlagResource);
					$('#updatedevice').dialog('destroy');
					if (msgArr.length > 0) {
						var prompt1 = "The following device(s) were successfully updated:<br/><br/>";
						for (var c=0; c < msgArr.length; c++){
							prompt1 += msgArr[c] + "<br/>";
						} 
						if (msgArr2.length > 0) {
							prompt1 += "<br/>The following device(s) were not updated:<br/><br/>";
							for (var c=0; c < msgArr2.length; c++){
								prompt1 += msgArr2[c] + "<br/>";
							}
						} 
						if (msgArr3.length > 0) {
							prompt1 += "<br/>The following device(s) were released:<br/><br/>";
							for (var c=0; c < msgArr3.length; c++){
								prompt1 += msgArr3[c] + "<br/>";
							}
						} 
						$("#Alert").dialog({
            			    autoOpen: false,
			                width: 300,
			                height: 200,
			                resizable: false,
			                modal: true,
							closeOnEscape: false,
					    	open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
            			    buttons: {
			                    "OK": function() {
        			                $(this).dialog("close");
            	    	        }
                			}
			            });
	
						$('#Alert').dialog("open");
	        			$('#Alert').empty().append(prompt1);
						$('.ui-dialog :button').blur();
					} else if (msgArr2.length > 0) {
						var prompt1 = "The following device(s) were not updated:<br/><br/>";
        		        for (var c=0; c < msgArr2.length; c++){
                		    prompt1 += msgArr2[c] + "<br/>";
		                }
						$("#Alert").dialog({
                			autoOpen: false,
			                width: 300,
    			            height: 200,
        	    		    resizable: false,
		            	    modal: true,
							closeOnEscape: false,
						    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		                	buttons: {
        		            	"OK": function() {
									//enableReservationButtons();
                		        	$(this).dialog("close");
					//				$('#restart12').removeClass('modal-overlay');
                        		}
		                	}	
	    		        });

    	        		$('#Alert').dialog("open");
		        	    $('#Alert').empty().append(prompt1);
						$('.ui-dialog :button').blur();

					}
					if ((msgArr.length > 0 || msgArr3.length > 0) && msgArr2.length == 0) {
						updateCurrentExtension();
					}
					msgArr = [];
					msgArr2 = [];
					msgArr3 = [];
					msgArr4 = [];
					/*if (refreshFlagResource == "ReservationReserve4") {
						$( ".datepicker" ).datepicker("destroy");			
						$('#ResViaCal').dialog('destroy');
						$('#ResViaCal').dialog('destroy');
						refreshFlagResource = temp2;
						enableReservationButtons();
						closeDialog();
					}*/
					logCheck(globalUser,"Resource Management","Extended a Reservation");
				}
			}
		},
		error: function() {
		
			$('#loading-container').dialog('destroy');
			$('#updatedevice').dialog('destroy');
			//globalPageLoad[globalLoad] = "";
			alerts("Update Failed");
			
		}
		
	});

}
function verifyDateTime3(startDate,startTime,endDate,endTime) {
	// VERIFY IF DATA IS COMPLETE
	var incompleteFlag = 0;
	if ( !startDate ) {
		incompleteFlag = 1;
		alerts( "Please fill up start date first." );
	} else if ( !startTime ) {
		incompleteFlag = 1;
		alerts( "Please fill up start time first." );
	} else if ( !endDate ) {
		incompleteFlag = 1;
		alerts( "Please fill up end date first." );
	} else if ( !endTime ) {
		incompleteFlag = 1;
		alerts( "Please fill up end time first." );
	}
	if ( incompleteFlag == 1 ) {
		return 1;
	}

	// VERIFY IF DATE AND TIME FORMAT IS CORRECT
	var sDate = new Array();
		sDate = startDate.split("-");
	var sTime = new Array();
		sTime = startTime.split(":");
	var eDate = new Array();
		eDate = endDate.split("-");
	var eTime = new Array();
		eTime = endTime.split(":");

	var formatFlag = 0;
	if ( sDate.length != 3 ) {
		formatFlag = 1;
		alerts( "Invalid date format. Please follow the MM/DD/YYYY format." );
	} else if ( sTime.length != 3 ) {
		formatFlag = 1;
		alerts( "Invalid time format. Please follow the HH/MM/SS format." );
	} else if ( eDate.length != 3 ) {
		formatFlag = 1;
		alerts( "Invalid date format. Please follow the MM/DD/YYYY format." );
	} else if ( eTime.length != 3 ) {
		formatFlag = 1;
		alerts( "Invalid time format. Please follow the HH/MM/SS format." );
	}

	if ( formatFlag == 1 ) {
		return 1;
	}

	// VERIFY IF DATE AND TIME IS VALID
	var thirtyone = new Array( 1 , 3 , 5 , 7 , 8 , 10 , 12 );
	var thirty = new Array( 4 , 6 , 9 , 11 );
	var sQuotient = sDate[0] / 4;
		sQuotient = String( sQuotient );
	var eQuotient = eDate[0] / 4;
		eQuotient = String( eQuotient );

	// START DATE
	// MONTH
	if ( sDate[1] < 1 || sDate[1] > 12 ) {
		alerts( "Invalid month input for start date." );
		return 1;
	}
	// DAY
	if ( ( thirtyone.indexOf( sDate[1] ) ) ) {
		if ( sDate[2] < 1 || sDate[2] > 31 ) {
			alerts( "Invalid day input for start date." );
			return 1;
		}
	} else if ( ( thirty.indexOf( sDate[1] ) ) ) {
		if ( sDate[2] < 1 || sDate[2] > 30 ) {
			alerts( "Invalid day input for start date." );
			return 1;
		}
	} else {
		var sYear = new Array();
			sYear = sQuotient.split(".");
		if ( sYear.length > 1 ) {
			if ( sDate[2] < 1 || sDate[2] > 28 ) {
				alerts( "Invalid day input for start date." );
				return 1;
			}
		} else {
			if ( sDate[2] < 1 || sDate[2] > 29 ) {
				alerts( "Invalid day input for start date." );
				return 1;
			}
		}
	}

	// YEAR
	if ( sDate[0] < 2011 || sDate[0] > 9999 ) {
		alerts( "Invalid year input for start date." );
		return 1;
	}

	// END DATE
	// MONTH
	if ( eDate[1] < 1 || eDate[1] > 12 ) {
		alerts( "Invalid month input for end date." );
		return 1;
	}

	// DAY
	if ( ( thirtyone.indexOf( eDate[1] ) ) ) {
		if ( eDate[2] < 1 || eDate[2] > 31 ) {
			alerts( "Invalid day input for end date." );
			return 1;
		}
	} else if ( ( thirty.indexOf( eDate[1] ) ) ) {
		if ( eDate[2] < 1 || eDate[2] > 30 ) {
			alerts( "Invalid day input for end date." );
			return 1;
		}
	} else {
		var sYear = new Array();
			sYear = sQuotient.split(".");
		if ( sYear.length > 1 ) {
			if ( eDate[2] < 1 || eDate[2] > 28 ) {
				alerts( "Invalid day input for end date." );
				return 1;
			}
		} else {
			if ( eDate[2] < 1 || eDate[2] > 29 ) {
				alerts( "Invalid day input for end date." );
				return 1;
			}
		}
	}

	// YEAR
	if ( eDate[0] < 2011 || eDate[0] > 9999 ) {
		alerts( "Invalid year input for end date." );
		return 1;
	}

	// START TIME
	if ( sTime[0] < 0 || sTime[0] > 23 ) {
		alerts( "Invalid hour input for start time." );
		return 1;
	} else if ( sTime[1] < 0 || sTime[1] > 59 ) {
		alerts( "Invalid minute input for start time." );
		return 1;
	} else if ( sTime[2] < 0 || sTime[2] > 59 ) {
		alerts( "Invalid seconds input for start time." );
		return 1;
	}

	// END TIME
	if ( eTime[0] < 0 || eTime[0] > 23 ) {
		alerts( "Invalid hour input for end time." );
		return 1;
	} else if ( eTime[1] < 0 || eTime[1] > 59 ) {
		alerts( "Invalid minute input for end time." );
		return 1;
	} else if ( eTime[2] < 0 || eTime[2] > 59 ) {
		alerts( "Invalid seconds input for end time." );
		return 1;
	}

	var EndStart = DateChecker( eDate[0] , eDate[1] , eDate[2] , eTime[0] , eTime[1] , eTime[2] , sDate[0] , sDate[1] , sDate[2] , sTime[0] , sTime[1] , sTime[2], 1 );
	if ( EndStart == 0 ) {
		alerts( "Reservation end time cannot be less than reservation start time." );
		return 1;
	} else if ( EndStart == 2 ) {
		alerts( "Reservation end time cannot be equal to reservation start time." );
		return 1;
	} else if ( EndStart == 3 ) {
		alerts( "Minimum reservation time is 10 minutes. Please adjust time of reservation." );
		return 1;
 	  }

		//CHECK IF START TIME == END TIME

		// IF REACHED HERE THEN VALIDATION IS COMPLETE
	return 2;

}
function changePageRM(num){
	for(var i = 0 ; i < 8; i++){
		if(num == i){
			$('.tablePage-'+i).show();
		}else{
			$('.tablePage-'+i).hide();
		}

	}
	
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : checkAllRM
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : checkAllRM
 *  #  PARAMETERS    : table
 *  #
 *  #######################################################################
 *  */


function checkAllRM(table){
	DeviceId = [];
	$('input:checkbox[name="ReservationReserveReleaseSel"]').each(function(){
			console.log('checkbox');
		if($('#'+table).is(":checked")){
			DeviceId.push($(this).attr('devId'));
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	$('input:checkbox[name="ReservationReserveSel"]').each(function(){
		if($('#'+table).is(":checked")){
			globalResourceId.push($(this).attr('id'));	
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();
	PortId = [];	
	$('input:checkbox[name="TesttoolSel"]').each(function(){
			
		if($('#'+table).is(":checked")){
			PortId.push($(this).attr('portId'));	
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();	
	genIds = [];
	$('input:checkbox[name="ReservationPortSel"]').each(function(){
		if($('#'+table).is(":checked")){
			genIds.push($(this).attr('id'));
			$("#ReservationConnectivity").trigger('click');
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			var idgen = genIds.indexOf($(this).attr('id'));
			if(idgen>-1){
				genIds.splice(idgen,1);
			}
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();	
	genIds = [];
	$('input:checkbox[name="ReservationConnectivitySel"]').each(function(){
		if($('#'+table).is(":checked")){
			genIds.push($(this).attr('id'));
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			var idgen = genIds.indexOf($(this).attr('id'));
			if(idgen>-1){
				genIds.splice(idgen,1);
			}
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();	
	DeviceId = [];
	$('input:checkbox[name="ReservationDevicesSel"]').each(function(){
		if($('#'+table).is(":checked")){
			$(this).parent().parent().addClass('highlight');

			DeviceId.push($(this).attr('devId'));
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();
	deviceHistoryId = [];	
	$('input:checkbox[name="ReservationHistorySel"]').each(function(){
		if($('#'+table).is(":checked")){
			deviceHistoryId.push($(this).attr('id'));	
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();
	scheventid = [];	
	$('input:checkbox[name="EventSchedulerSel"]').each(function(){
		if($('#'+table).is(":checked")){
			scheventid.push($(this).attr('id'));	
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	enableRMButtons();
	mainConfigHistoryId = [];	
	$('input:checkbox[name="HistorySchedulerSel"]').each(function(){
		if($('#'+table).is(":checked")){
			mainConfigHistoryId.push($(this).attr('id'));	
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
		enableRMButtons();	
	$('input:checkbox[name="ManageDevicesSel"]').each(function(){
		if($('#'+table).is(":checked")){
			genIds.push($(this).attr('id'));	
			$(this).parent().parent().addClass('highlight');
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : checkSingleRM
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : check single information on the table
 *  #  PARAMETERS    : table
 *  #
 *  #######################################################################
 *  */


function checkSingleRM(table,src){
	var ctr = 0;
	var ctrtotal = 0;
	if(table == "ReservationReserve"){
		globalResourceId = [];
		if($(src).is(':checked')){
			$(src).parent().parent().addClass('highlight');
			globalResourceId.push($(src).attr('rIds'));
			ResId = $(src).attr('rIds');
			var devId = $(src).attr('did');
			groupHighlight('',devId);
			ctr++;
		}else if($(src).is(':checked') == false){
			var val = $(src).attr('rIds');
			var devId = $(src).attr('did');
			groupHighlight(val,devId);
			ctr--;
		}
		ctrtotal++;
		console.log(globalResourceId.length,'asddasd');
		enableRMButtons();	
	}else if(table == "ReservationReserveRelease"){
		DeviceId = [];
		$('input:checkbox[name="ReservationReserveReleaseSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				DeviceId.push($(this).attr('devId'));	
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});	
		enableRMButtons();
	}else if(table == "ReservationConnectivity"){
		$('input:checkbox[name="ReservationConnectivitySel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				genIds.push($(this).attr('pId'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});
		enableRMButtons();	
	}else if(table == "Testtool"){
		$('input:checkbox[name="TesttoolSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				PortId.push($(this).attr('portId'));	
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});
		
	}else if(table == "ReservationPort"){
		$('input:checkbox[name="ReservationPortSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				genIds.push($(this).attr('rpId'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});
		enableRMButtons();
	}else if(table == "ReservationHistory"){
		$('input:checkbox[name="ReservationHistorySel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				deviceHistoryId.push($(this).attr('dhId'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});
		enableRMButtons();
	}else if(table == "ReservationDevices"){
		StartDate = [];
		StartTime = [];
		EndDate = [];
		EndTime = [];
		TimeInterval = [];
		Recurrence = [];	
		DeviceId = [];
		$('input:checkbox[name="ReservationDevicesSel"]').each(function(){
			if($(this).is(':checked')){
		//		$('#ReserveButton').removeAttr('disabled',false);
				$(this).parent().parent().addClass('highlight');
				var gethost = $(this).attr("hostname");
				var getmodel = $(this).attr("model");
				
				RMLoadObject.push({"HostName":gethost,"Model":getmodel});
				DeviceId.push($(this).attr('devId'));
				StartDate.push($.trim($(this).parent().parent().find('td').eq(11).find('input').val()));
				TimeInterval.push($.trim($(this).parent().parent().find('td').eq(13).find('input').val()));
				Recurrence.push($.trim($(this).parent().parent().find('td').eq(14).find('input').val()));
				StartTime.push($.trim($(this).parent().parent().find('td').eq(12).find('input').val()));
				EndDate.push($.trim($(this).parent().parent().find('td').eq(16).find('input').val()));
				EndTime.push($.trim($(this).parent().parent().find('td').eq(17).find('input').val()));
				DeviceReservation.push($.trim($(this).parent().parent().find('td').eq(15).find('select').val()));
				getResLimit();
				getdevicetype(this.id);	
				$(this).parent().parent().find('td').eq(11).find('input').removeAttr('disabled');
				$(this).parent().parent().find('td').eq(13).find('input').removeAttr('disabled');
				$(this).parent().parent().find('td').eq(14).find('input').removeAttr('disabled');
				$(this).parent().parent().find('td').eq(12).find('input').removeAttr('disabled');
				$(this).parent().parent().find('td').eq(16).find('input').removeAttr('disabled');
				$(this).parent().parent().find('td').eq(17).find('input').removeAttr('disabled');
				$(this).parent().parent().find('td').eq(15).find('select').removeAttr('disabled');
				ctr++;
			}else{
			//	disableRMButtons();
				$(this).parent().parent().removeClass('highlight');
				$(this).parent().parent().find('td').eq(11).find('input').attr('disabled',true);
				$(this).parent().parent().find('td').eq(13).find('input').attr('disabled',true);
				$(this).parent().parent().find('td').eq(14).find('input').attr('disabled',true);
				$(this).parent().parent().find('td').eq(12).find('input').attr('disabled',true);
				$(this).parent().parent().find('td').eq(16).find('input').attr('disabled',true);
				$(this).parent().parent().find('td').eq(17).find('input').attr('disabled', true);
				$(this).parent().parent().find('td').eq(15).find('select').attr('disabled',true);
				ctr--;
			}
			ctrtotal++;
		});
		
		enableRMButtons();
	}else if(table == "ReservationImportedDevices"){
		$('input:checkbox[name="ReservationImportedSel"]').each(function(){
			if($(this).is(':checked')){
				enableRMButtons();
				$(this).parent().parent().addClass('highlight');
					DeviceId.push($(this).attr('devId'));
					StartDate.push($.trim($(this).parent().find('td').eq(10).find('input').val()));
					TimeInterval.push($.trim($(this).parent().find('td').eq(12).find('input').val()));
					Recurrence.push($.trim($(this).parent().find('td').eq(13).find('input').val()));
					StartTime.push($.trim($(this).parent().find('td').eq(11).find('input').val()));
					EndDate.push($.trim($(this).parent().find('td').eq(15).find('input').val()));
					EndTime.push($.trim($(this).parent().find('td').eq(16).find('input').val()));
					DeviceReservation.push($.trim($(this).parent().find('td').eq(14).find('select').val()));
					ctr++;	
			}else{
				$(this).parent().parent().removeClass('highlight');
					ctr--;
			}
			ctrtotal++;
		});
		
	}else if(table == "SchedulerEvent"){
		$('input:checkbox[name="EventSchedulerSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				scheventid.push($(this).attr('erId'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});
		
		enableRMButtons();
	}else if(table == "SchedulerHistory"){
		$('input:checkbox[name="HistorySchedulerSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				mainConfigHistoryId.push($(this).attr('mcId'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
			ctrtotal++;
		});
		enableRMButtons();
	}else if(table == "ManageDevices"){
		$('input:checkbox[name="ManageDevicesSel"]').each(function(){
			var curIdx = genIds.indexOf($(this).attr('devId'));
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				if(curIdx==-1){
					genIds.push($(this).attr('devId'));
				}
			}else{
				if(curIdx>-1){
					genIds.splice(curIdx,1);
				}
				$(this).parent().parent().removeClass('highlight');
			}
		});
		
	}
	if(ctr == ctrtotal){
		$('#cb'+globalPageRM).prop('checked',true);
	}else{
		$('#cb'+globalPageRM).prop('checked',false);
	}


}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : clearAllRHist
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function clearAllRHist(){
	prompts='Are you sure you want to Clear All History?'
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 350,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Yes": function() {
				clearAllHistory();
				loadHistory
				$(this).dialog("close");

			},
			"No": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#Alert').empty().append(prompts);
	$('#Alert').dialog("open");

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : clearAllSHist
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function clearAllSHist(){
	prompts='Are you sure you want to Clear All History?'
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 350,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Yes": function() {
				clearAllSchedHistory();
				loadHistoryScheduler();
				$(this).dialog("close");
			},
			"No": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#Alert').empty().append(prompts);
	$('#Alert').dialog("open");

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : cancelEvent
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function cancelEvent(){
	prompts='Are you sure you want to Cancel Event?'
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 350,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Yes": function() {
				SchedCancel();
				$(this).dialog("close");
				loadEventSched();
			},
			"No": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#Alert').empty().append(prompts);
	$('#Alert').dialog("open");


}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : clearResHistory
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function clearResHistory(){
	prompts='Are you sure you want to Clear the following history?'
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 350,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Yes": function() {
				clearRHistory();
				loadHistory();
				$(this).dialog("close");
			},
			"No": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#Alert').empty().append(prompts);
	$('#Alert').dialog("open");


}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : clearSchedHistory
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function clearSchedHistory(){
	prompts='Are you sure you want to Clear the following history?'
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 350,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Yes": function() {
				clearSHistory();
				$(this).dialog("close");
				loadHistorySched();
			},
			"No": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#Alert').empty().append(prompts);
	$('#Alert').dialog("open");


}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : deleteMDevices
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : popup confirmation for deleting device.
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function deleteMDevices(){
	if(genIds.length<1){ alertUser("No device selected."); return; }
	prompts='Are you sure you want to Delete device(s)?'
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 350,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Yes": function() {
				deleteManageDevice();
				$(this).dialog("close");
				loadManageDevice(1);
			},
			"No": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#Alert').empty().append(prompts);
	$('#Alert').dialog("open");


}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : releaseDevice
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : confirmation for releasing all reservations
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function releaseDevice(){
	$('#Alert').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 355,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Release Specific": function(){
				releaseSpecificDevice();
	//			checkIfTheresAnotherUser("single");
		//		loadReserve();
				$(this).dialog("close");
			},
			"Release All": function(){
//				releaseAllDevices();
				checkIfTheresAnotherUser("all");
//				loadReserve();
				$(this).dialog("close");
			},
			"Cancel": function(){
				loadReserve();
      			$(this).dialog("close");
			}
		}
	});
	$('#Alert').dialog("open");
	$('#Alert').empty().load('pages/RM/Release.html?', function() {
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : releaseSpecificDevice
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : release specific popup.
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function releaseSpecificDevice(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 900,
		height:550,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  }
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/ReleaseSpecific.html?', function() {
		loadReserveRelease();
	});

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : disabledRMButtons
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : February 20,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : disables RM Buttons 
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function disableRMButtons(){
	$('.datepickerdev').attr('disabled',true);
	$('.timepicker').attr('disabled',true);
	$('.DeviceType').attr('disabled',true);
	$('.interval').attr('disabled',true);
	$('.iteration').attr('disabled',true);
	$('#ReserveApplyButton').hide();
	$('#ReserveCancelButton').hide();
	$('#ReserveEditButton').show();
	$('#ReserveReleaseButton').show();
	$('#ReserveGenerateReportButton').show();
	$('.resres').removeAttr('checked');
	$('.resres').parent().parent().removeClass('highlight');
	$("#PortGenerateReport").attr('disabled',true);
	$('#PortGenerateReport').addClass('ui-state-disabled');
	}
function enableRMButtons2(){
	$('.datepickerdev').removeAttr('disabled');
	$('.timepicker').removeAttr('disabled');
	$('.DeviceType').removeAttr('disabled');
	$('.interval').removeAttr('disabled');
	$('.iteration').removeAttr('disabled');
	$('.resres').parent().parent().attr('disabled',true);
}
function enableRMButtons(){

//Reserved Buttons
	if(globalResourceId.length > 0){
		$('#ReserveEditButton').removeAttr('disabled');
		$('#ReserveEditButton').removeClass('ui-state-disabled');
		$('#ReserveReleaseButton').removeAttr('disabled');
		$('#ReserveReleaseButton').removeClass('ui-state-disabled');
		$('#ReserveGenerateReportButton').removeAttr('disabled');
		$('#ReserveGenerateReportButton').removeClass('ui-state-disabled');
	}else if(globalResourceId.length > 1){
		$('#ReserveEditButton').attr('disabled',true);
		$('#ReserveEditButton').addClass('ui-state-disabled');
	}else{
		$('#ReserveEditButton').attr('disabled',true);
		$('#ReserveEditButton').addClass('ui-state-disabled');
		$('#ReserveReleaseButton').attr('disabled',true);
		$('#ReserveReleaseButton').addClass('ui-state-disabled');
		$('#ReserveGenerateReportButton').attr('disabled',true);
		$('#ReserveGenerateReportButton').addClass('ui-state-disabled');
	}
	if(DeviceId.length == 1){
		$('#ReleaseButton').removeAttr('disabled');
		$('#ReleaseButton').removeClass('ui-state-disabled');
	}else{
		$('#ReleaseButton').attr('disabled',true);
		$('#ReleaseButton').addClass('ui-state-disabled');

	}	
//Connectivity Button
	if(genIds.length > 0){
		$("#ConnectivityGenReport").removeAttr('disabled');
		$('#ConnectivityGenReport').removeClass('ui-state-disabled');
		$("#PortGenerateReport").removeAttr('disabled');
		$('#PortGenerateReport').removeClass('ui-state-disabled');
	}else{
		$("#PortGenerateReport").attr('disabled');
		$('#PortGenerateReport').addClass('ui-state-disabled');
		$("#ConnectivityGenReport").attr('disabled',true);
		$('#ConnectivityGenReport').addClass('ui-state-disabled');
	}
//Devices Button
	if(DeviceId.length > 0){
		$('#ReserveButton').removeAttr('disabled');
		$('#ReserveButton').removeClass('ui-state-disabled');
	}else{
		$('#ReserveButton').attr('disabled',true);
		$('#ReserveButton').addClass('ui-state-disabled');
	}
//History Buttons
	if(deviceHistoryId.length > 0){
		$("#ClearRHistory").removeAttr('disabled');
		$('#ClearRHistory').removeClass('ui-state-disabled');
	}else{
		$("#ClearRHistory").attr('disabled',true);
		$('#ClearRHistory').addClass('ui-state-disabled');
	}
//Scheduler History Buttons
	if(mainConfigHistoryId.length > 0){
		$("#ClearSHistory").removeAttr('disabled');
		$('#ClearSHistory').removeClass('ui-state-disabled');
	}else{
		$("#ClearSHistory").attr('disabled',true);
		$('#ClearSHistory').addClass('ui-state-disabled');
	}	
//Scheduler Event Buttons
	if(scheventid.length > 0){
		$("#CancelEvent").removeAttr('disabled');
		$('#CancelEvent').removeClass('ui-state-disabled');
	}else{
		$("#CancelEvent").attr('disabled',true);
		$('#CancelEvent').addClass('ui-state-disabled');
	}
}
function setIteration(index,val){
	if(index == 13 && val == 0){
		alerts('hioy hoy');
	}
}
function loadDevicesHTML5(){
	var domain = $('#domainSelect').val();
	var zoneName = $('#zoneSelect').val();
	var groupName = $('#groupSelect').val();
	var time = convertTime();
	var dataArr  = time.split(":");
	var endTime = parseInt(dataArr[0])+2+":"+dataArr[1]+":"+dataArr[2];
	var date = new Date();
	var month = parseInt(date.getMonth())+1;
	if(month < 10 ){
		month = "0"+month;		
	}
	var day = date.getDate();
	if(day < 10){
		day = "0"+day;
	}
	var dateToday = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()
//	var dateToday = date.getFullYear()+'-'+month+'-'+day;
	var tableClass = "";
	var page = $('#RMPageNumber').text();
	var limit = $('#ResourceManagementPageLimit').val();
	//var url ='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationDevice&query=limit='+limit+'`page='+page+'`sort=`orderby=`user='+globalUserName+'`filter='+globalStrFilter5+'`domain='+domain+"`ZoneName="+zoneName+"`GroupName="+groupName+'&version=3.0';

	var url ="https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=ReservationDevice&query={'QUERY':[{'limit':'"+limit+"','page':'"+page+"','sort':'','orderby':'','user':'"+globalUserName+"','filter':'"+globalStrFilter5+"','domain':'"+domain+"','ZoneName':'"+zoneName+"','GroupName':'"+groupName+"'}]}";

			$("#RMDevices-table > tbody").html(loader);
	var dateToday = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
         /*   var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
            var html ='',startRes='',endRes='';
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesDevices').html(json.root[0].total);
			}else{

				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
				//$("#RMTotalMatches").html(root[0].getAttribute('total'));
			}
			if(json.root[0].total == 0){
				html += "<tr><td colspan='19'>No available data.</td></tr>";
				$("#RMDevices-table > tbody").empty().append(html);
				return;
			}
            for(var a =0; a< json.root[0].row.length; a++){

				html += "<tr class='trDevices "+tableClass+"' devId = '"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId+"'>";
				html += "<td><input type='checkbox' devId = '"+json.root[0].row[a].DeviceId+"' id='"+json.root[0].row[a].DeviceId+"' name='ReservationDevicesSel' hostname='"+json.root[0].row[a].HostName+"' model='"+json.root[0].row[a].Model+"' onclick='checkSingleRM(\"ReservationDevices\");'/></td>";
		        html += "<td class='ReservationDevices'>"+json.root[0].row[a].DeviceId+"</td>";
		        html += "<td did='td"+json.root[0].row[a].DeviceId+"' class='toolTip' onclick='ShowDeviceInformation(\""+json.root[0].row[a].HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].HostName+"<div class='tableToolTip' id='divtoolTip"+json.root[0].row[a].DeviceId+"' style='display:none'><ul>";
				html += getTooltipInfo(json.root[0].row[a],"HostName");
				html += "</ul></div></td>";
				if(json.root[0].row[a].ManagementIp == undefined || json.root[0].row[a].ManagementIp ==""){
					html+="<td class='ReservationDevices'>N/A</td>";
				}else{
					html += "<td class='ReservationDevices'>"+json.root[0].row[a].ManagementIp+"</td>";
			  	}
				if(json.root[0].row[a].ConsoleIp == undefined || json.root[0].row[a].ConsoleIp ==""){
					html+="<td class='ReservationDevices'>N/A</td>";
				}else{
					html += "<td class='ReservationDevices'>"+json.root[0].row[a].ConsoleIp+"</td>";
			  	}
				if(json.root[0].row[a].Manufacturer == undefined || json.root[0].row[a].Manufacturer ==""){
					html+="<td class='ReservationDevices'>N/A</td>";
				}else{
					html += "<td class='ReservationDevices'>"+json.root[0].row[a].Manufacturer+"</td>";
			  	}
				if(json.root[0].row[a].Model == undefined || json.root[0].row[a].Model ==""){
					html+="<td class='ReservationDevices'>N/A</td>";
				}else{
					html += "<td class='ReservationDevices'>"+json.root[0].row[a].Model+"</td>";
			  	}
			  	html += "<td class='ReservationDevices'>"+json.root[0].row[a].availablePorts+"</td>";	
				if(json.root[0].row[a].DomainName == undefined || json.root[0].row[a].DomainName ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].DomainName+"</td>";
			  	}
				if(json.root[0].row[a].ZoneName == undefined || json.root[0].row[a].ZoneName ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].ZoneName+"</td>";
			  	}
				if(json.root[0].row[a].GroupName == undefined || json.root[0].row[a].GroupName ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td class='ReservationDevices'>"+json.root[0].row[a].GroupName+"</td>";
			  	}

				html += "<td><input style='border:none;text-align:center;' type='text' id='StartDate' class='datepickerdev' readonly='yes' value='"+dateToday+"'/></td>";
		        html += "<td><input style='border:none;text-align:center;' type='text' id='StartTime' class='timepicker' readonly='yes' value='"+time+"' onchange='' /></td>";
				html += "<td><input style='border:none;text-align:center;' id='intervalRR' class='interval' type='text' onkeyup='setIteration(this.value);' onkeypress='return checkNumberInputChar(event,this);' value='0'/></td>";
		        html += "<td><input style='border:none;text-align:center;' id='iterationRR"+a+"' class='iteration' type='text' onkeyup='setIteration(this.value)' onkeypress='return checkNumberInputChar(event,this);' value='1'/></td>";

		        html += "<td><select style='border:none;' class='DeviceType' id='deviceType"+json.root[0].row[a].DeviceId+"'>";
				if(json.root[0].row[a].DeviceType == "TestTool"){
					html += "<option>Exclusive</option>";
					html += "<option selected>Non - Exclusive</option>";
				}else{
					html += "<option>Non - Exclusive</option>";
					html += "<option selected>Exclusive</option>";
				}
				html += "</select></td>";

				html += "<td><input style='border:none;text-align:center;' id='EndDate' type='text' readonly='yes' class='datepickerdev' value='"+dateToday+"'/></td>";
		        html += "<td><input style='border:none;text-align:center;' id='EndTime' type='text' readonly='yes' class='timepicker' value='"+endTime+"' onchange=''/></td>";
				html +="</tr>";
				
			}
		
			$("#RMDevices-table > tbody").html(html);
	//		$("#RMDevices-table").table("refresh");
			$("#tabsDevices" ).tabs(); 	
			$("#RMReservation").trigger('create');
			globalPageRM = "ReservationDevices";
			autoRefreshTable();
			$('.datepickerdev').datepicker();
			$('.timepicker').timepicker({
                ampm: false,
                showTime: true,
                datepicker:false,
                timeFormat: 'hh:mm:ss',
                showSecond: true,
                hourGrid: 6,
                minuteGrid: 10,
               secondGrid: 10
            });
			$('.ui-datepicker-current').attr("id","DoneButton");
			hoverTable();
			disableRMButtons();
			rmExpandedView();
		}
	});

}
function loadImportedDevicesHTML5(){
	var domain = $('#domainSelect').val();
	var zoneName = $('#zoneSelect').val();
	var groupName = $('#groupSelect').val();
	var time = convertTime();
	var dataArr  = time.split(":");
	var endTime = parseInt(dataArr[0])+2+":"+dataArr[1]+":"+dataArr[2];
	var date = new Date();
	var dateToday = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()
	var page = $('#RMPageNumber').val();
	var limit = $('#ResourceManagementPageLimit').val();
	var url = getURL('RM4')+'action=ReservationDeviceAffiliated&query={"QUERY":"limit":"'+limit+'","page":"'+page+'","sort":"","orderby":"","user":"'+globalUserName+'","filter":"","domain":"'+domain+'","ZoneName":"'+zoneName+'","GroupName":"'+groupName+'"}]}';

	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
           /* var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
			var tableClass = "";
            var row = xmlDoc.getElementsByTagName('row');
		*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

            var html ='',startRes='',endRes='';
			if(globalDeviceType == "Mobile"){
				$('#totalMatchesImportedDevices').html(json.root[0].total);
			}else{	

				rmPagination(json.root[0].pages,json.root[0].page,json.root[0].total);
				//$("#RMTotalMatches").html(root[0].getAttribute('total'));
			}
            for(var a =0; a< json.root[0].row.length; a++){
				if( a % 2 == 0){
					tableClass = "alt";
				}else{
					tableClass = "";
				}
				html += "<tr class='trImportedDevices "+tableClass+"' devId = '"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId+"'>";
				html += "<td><input type='checkbox' devId = '"+json.root[0].row[a].DeviceId+"' rId='"+json.root[0].row[a].ResourceId+"' id='"+json.root[0].row[a].ResourceId+"' name='ReservationImportedSel' onclick='checkSingleRM(\"ReservationImportedDevices\")';/></td>";
		        html += "<td>"+json.root[0].row[a].DeviceId+"</td>";
		        html += "<td onclick='ShowDeviceInformation(\""+json.root[0].row[a].HostName+"\");' style='cursor:pointer;'>"+json.root[0].row[a].HostName+"</td>";
				html += "<td>"+json.root[0].row[a].ManagementIp+"</td>";
		        html += "<td>"+json.root[0].row[a].ConsoleIp+"</td>";
		        html += "<td>"+json.root[0].row[a].Manufacturer+"</td>";
		        html += "<td>"+json.root[0].row[a].Model+"</td>";
		        html += "<td>"+json.root[0].row[a].AvailablePorts+"</td>";
		        html += "<td>"+json.root[0].row[a].DomainName+"</td>";
		        html += "<td>"+json.root[0].row[a].ZoneName+"</td>";
		        html += "<td>"+json.root[0].row[a].GroupName+"</td>";
		
				if(json.root[0].row[a].AvailabilityDay == undefined || json.root[0].row[a].AvailabilityDay ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].AvailabilityDay+"</td>";
			  	}
				if(json.root[0].row[a].AvailabilityTime == undefined || json.root[0].row[a].AvailabilityTime ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].AvailabilityTime+"</td>";
			  	}
				if(json.root[0].row[a].AvailabilityDate == undefined || json.root[0].row[a].AvailabilityDate ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].AvailabilityDate+"</td>";
			  	}
				if(json.root[0].row[a].Availability == undefined || json.root[0].row[a].Availability ==""){
					html+="<td>N/A</td>";
				}else{
					html += "<td>"+json.root[0].row[a].Availability+"</td>";
			  	}
				html += "<td><input id='startDate' type='text'/></td>";
		        html += "<td><input  name='mydate' id='startTime' value='"+time+"'/></td>";
		        html += "<td><input id='inter' type='text' class='Interval' value='0'/></td>";
		        html += "<td><input id='iter' onkeyup='setIteration();' type='text' class='Iteration' value='1'/></td>";
		        html += "<td><select class='DeviceType' id='deviceType'><option>Non-Exclusive</option><option>Exclusive</option></select></td>";
		        html += "<td><input name='mydate' id='endDate' value='"+dateToday+"'/></td>";
		        html += "<td><input name='mydate' id='endTime' value='"+endTime+"'/></td>";
	      		html += "</tr>";
       		}
			$('#rmImportedDevices').empty().html(html);
	//		$("#RMImportedDevices-table").table("refresh");
			globalPageRM = "ReservationImportedDevices";
			$('.ui-icon-grid').css({"position":"relative"});
			autoRefreshTable();
			rmExpandedView();
		}
	});
}

function openTestTool(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 700,
		height:500,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
			buttons: {
				"OK":function(){
					$(this).dialog("close");
				}
			}
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/Testtool.html?', function() {
		setTimeout(function(){
			loadTesttoolHeader();
			loadTesttoolTable();
		},2000);
	});

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : extendReservation 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : February 27,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : extend Reservation popup
 #  PARAMETERS    :
 #
 #######################################################################
*/
function extendReservation(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: "auto",
		height: "auto",
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Ok": function(){
				var cnt = 0;
				var cnt2 = 0;
				var flag = 0;
				var flag2 = 0;
				if ($('#toAppExt').val() == "Specific") {
					flag = 1;
					$('input[name="specDevSel"]').each(function() {
				   		if ($(this).is(':checked')) {
							cnt++;
						}
					});
				}
				if ($('#iterExt').val() == "Specific") {
					flag2 = 1;
					$('input[name="specIterSel"]').each(function() {
				    	if ($(this).is(':checked')) {
							cnt2++;
						}
					});
				}
				if ( flag == 1 && cnt == 0 ) {
					alerts("<b>Please select at least 1 device to extend reservation.</b>");
						return;
				}	
				var howto = "";
					$('input[name="extRadio"]').each(function() {
						if ($(this).is(':checked')) {
			    	    	howto = $(this).val();
				   	    }
					});
					if (howto == "extend") {
						$('#ReserveApplyButton').show();
						$('#ReserveCancelButton').show();
						$('#ReserveEditButton').hide();
						$('#ReserveReleaseButton').hide();
						$('#ReserveGenerateReportButton').hide();
						$('#ReservationReserveCheckbox').attr('disabled','disabled');
						$('#ReserveCancelButton').click(function(){
							globalPageIter = {};
						});
						enableInputFields();
					}else{
						applySameDuration();
					}

				$(this).dialog("close");
			},
			"Cancel": function(){
				$(this).dialog("close");
				$('#ReserveReleaseButton').attr('disabled',true);
				$('#ReserveGenerateReportButton').attr('disabled',true);
				$('#ReservationReserve').removeAttr('checked');
				
			}
		}		
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/RMEditDevice.html?', function() {
		getDevicesFromSelectedReservation();
	//	getActiveReservationIteration();
		setIterationOptions();
	});
}

/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : hideIterations 
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 3,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   :
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function hideIterations(val) {
	switch (val) {
		case "same":
			$('#iterExt').parent().parent().hide();
			$('#specificIterTable').attr('style','display:none');
		break;
		case "extend":
			var clname = "";
			switch (globalPageRM) {
				case "ReservationReserve": clname = "resres"; break;
			}

			var resid;
			var d=1;
			var andr;
			$('.'+clname).each(function() {
				if ($(this).is(':checked')) {
	   				andr = $(this).parent().parent().find('td').eq(14).find('input').val();
					resid = $(this).attr('rid');
				}
			});

			var startIter = getActiveReservationIteration(resid);
			var ileft = andr - startIter;
			if (ileft > 1) {
				$('#iterExt').parent().parent().show();
				$('#specificIterTable').removeAttr('style')
			} else {
				$('#iterExt').parent().parent().hide();
				$('#specificIterTable').attr('style','display:none');
			  }
			break;

	}

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : addDevicePopUp
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 3,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   :
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */
function addDevicePopUp(){
	newDevice();
	setAutoDVariable();
	AutoDType = "admin";
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		height:'auto',
		'max-height':700,
		'max-width':800,
		width:'auto',
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  }
		
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/RMAddDevice.html?', function() {
		$("#tabsDevInfo" ).tabs(); 
		$('#devdomainAutoD').empty().append(autoDDomainOptions);
		addManageDevice();
	});
}

function openDeviceStructure(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		'max-height':700,
		height:'auto',
		'max-width':1500,
		width:'auto',
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
/*		buttons:{
			"Save": function(){
			},
			"Cancel": function(){
				$(this).dialog("close");
			},
			"Change Device Structure": function(){
				addDevicePopUp();
			}
		}		
*/
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/RMDeviceStructure.html?', function() {

		$('#divDevice').tabs();
	    $('#divPort').tabs();
	    $('#divSlot').tabs();
	    $('#divModule').tabs();
	    $('#divPic').tabs();

	});
}

function intAutoDAdmin(){
	$("#checkPartPAdmin").click( function(){
		if($(this).is(':checked')){
			$("#partnerInfoAdminAutoD").show();
		}else{
			$("#partnerInfoAdminAutoD").hide();
		}
	});
}

function cancelAdminAddManu() {
	$('#Alert2').dialog('close');
}

function openCommitRMOption(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		width: 250,
		height: 300,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Ok": function(){			
				getServerTime();
//               getdevicetype();
                queryCreateXMLData();
				$(this).dialog("close");
			},
			"Cancel": function(){
				$(this).dialog("close");
			}
		}	
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/RMCommit.html?', function() {
	});

}
function showSaveImagePopUp(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		height:500,
		width:1000,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Ok": function(){			
				$(this).dialog("close");
			},
			"Cancel": function(){
				$(this).dialog("close");
			}
		}	
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/SaveImageConfig.html?', function() {
		saveImage();
		saveImageDetail();
		saveConfig();
		saveConfigDetail();
	});


}

function showLoadImagePopUp(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		height:500,
		width:1000,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Ok": function(){			
				$(this).dialog("close");
			},
			"Cancel": function(){
				$(this).dialog("close");
			}
		}	
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/LoadImageConfig.html?', function() {
		loadImage();
		loadImageDetail();
		loadConfig();
		loadConfigDetail();
	});


}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showConfigurationInformation
 #  AUTHOR        : Angeline Bringas
 #  DATE          : February 27,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : shows configuration info popup
 #  PARAMETERS    : src
 #
 #######################################################################
*/
function showConfigurationInformation(src){
	devdev1 = $(src).attr('mid');
	statsstats = $(src).attr('sid');
	eventid1 = $(src).attr('eid');
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		height:500,
		overflow: "auto",
		width:900,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Cancel": function(){
				loadHistorySched();
				loadEventSched();
				$(this).dialog("close");
			}
		}	
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/ConfigurationInfo.html?', function() {
		loadHistoryScheduler2();	
		loadHistoryScheduler3();
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showAllConnectionsPopUp
 #  AUTHOR        : Angeline Bringas
 #  DATE          : February 27,2014 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : shows connectivity logs popup
 #  PARAMETERS    :
 #
 #######################################################################
*/
function showAllConnectionPopUp(){
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		width:400,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Cancel": function(){
				$(this).dialog("close");
			}
		}	
	});
	$('#Alert2').dialog("open");
	$('#Alert2').empty().load('pages/RM/ConnectivityLogs.html?', function() {
		getConnectivityLogs(ConfigName,MappingId);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showDeviceLinkSanityLogs
 #  AUTHOR        : Angeline Bringas
 #  DATE          : February 27,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : show device logs popup
 #  PARAMETERS    :
 #
 #######################################################################
*/
function showDeviceLinkLogs(src){
	globalDeviceId = $(src).attr('deviceId');	
	globalHostName = $(src).attr('hostname');	

	$('#Alert').dialog({
		autoOpen: false,
		resizable: true,
		width:400,
		height:400,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
	
			"Cancel": function(){
				$(this).dialog("close");
			}
		}	
	});
	$('#Alert').dialog("open");
	$('#Alert').empty().load('pages/RM/RMDeviceLogs.html?', function() {
		
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : rmExpandedView
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 5,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : expandedView
 #  PARAMETERS    :
 #
 #######################################################################
*/

function rmExpandedView(){
	if(globalPageRM == "ReservationReserve"){
		if($('#RMExpandedView').is(':checked')){
			$('#thDevice').attr('colspan',7);
			$('#thReservation').attr('colspan',11);
			$('.ReservationReserveTable').show();
		}else{
			$('#thDevice').attr('colspan',1);
			$('#thReservation').attr('colspan',9);
			$('.ReservationReserveTable').hide();
		}
	}else if(globalPageRM == "ReservationConnectivity"){
		if($('#RMExpandedView').is(':checked')){
			$('#thDevice2').attr('colspan',7);
			$('#thSwitch').attr('colspan',6);
			$('#thDevice3').attr('colspan',6);
			$('#thcols').attr('colspan',5);
			$('.ReservationConnectivity').show();
		}else{
			$('#thDevice2').attr('colspan',5);
			$('#thSwitch').attr('colspan',5);
			$('#thDevice3').attr('colspan',5);
			$('#thcols').attr('colspan',2);
			$('.ReservationConnectivity').hide();
		}
	}else if(globalPageRM == "ReservationPort"){
		if($('#RMExpandedView').is(':checked')){
			$('#thDevice4').attr('colspan',6);
			$('#thReservation2').attr('colspan',5);
			$('#thSystem').attr('colspan',4);
			$('#thSystem').show();
			$('.ReservationPort').show();
		}else{
			$('#thDevice4').attr('colspan',2);
			$('#thReservation2').attr('colspan',4);
			$('#thSystem').hide();
			$('.ReservationPort').hide();
		}	
	}else if(globalPageRM == "ReservationDevices"){
		if($('#RMExpandedView').is(':checked')){
			$('#thDevice6').attr('colspan',10);
			$('#thReservation4').attr('colspan',5);
			$('#thExpiration').attr('colspan',2);
			$('.ReservationDevices').show();
		}else{
			$('#thDevice6').attr('colspan',5);
			$('#thReservation4').attr('colspan',5);
			$('#thExpiration').attr('colspan',2);
			$('.ReservationDevices').hide();
		}	
	}else if(globalPageRM == "ReservationImportedDevices"){
		if($('#RMExpandedView').is(':checked')){
			$('.ReservationImportDevices').show();
		}else{
			$('.ReservationImportDevices').hide();
		}	
	}else if(globalPageRM == "ReservationHistory"){
		if($('#RMExpandedView').is(':checked')){
			$('#thDevice5').attr('colspan',6);
			$('#thReservation3').attr('colspan',6);
			$('#thcols2').attr('colspan',1);
			$('.ReservationHistory').show();
		}else{
			$('#thDevice5').attr('colspan',1);
			$('#thReservation3').attr('colspan',6);
			$('#thcols2').attr('colspan',1);
			$('.ReservationHistory').hide();
		}	
	}else if(globalPageRM == "SchedulerEvent"){
		if($('#RMExpandedView').is(':checked')){
			$('.ReservationSchedEve').show();
		}else{
			$('.ReservationSchedEve').hide();
		}	
	}else if(globalPageRM == "SchedulerHistory"){
		if($('#RMExpandedView').is(':checked')){
			$('.ReservationSchedHist').show();
		}else{
			$('.ReservationSchedHist').hide();
		}	
	}else if(globalPageRM == "ReserveRelease"){
		if($('#ReleaseExpanded').is(':checked')){
			$('#thDevice6').attr('colspan',6);
			$('#thReservation4').attr('colspan',7);
		}else{
			$('#thDevice6').attr('colspan',1);
			$('#thReservation4').attr('colspan',6);

		}
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : extendOkButton
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 5,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : Ok Button for extend
 #  PARAMETERS    :
 #
 #######################################################################
*/

function extendOkButton(){
	$('#Alert2').dialog("close");
	var cnt = 0;
	var cnt2 = 0;
	var flag = 0;
	var flag2 = 0;
	if ($('#toAppExt').val() == "Specific") {
		flag = 1;
		$('input[name="specDevSel"]').each(function() {
	   		if ($(this).is(':checked')) {
				cnt++;
			}	
		});
	}

	if ($('#iterExt').val() == "Specific") {
		flag2 = 1;
		$('input[name="specIterSel"]').each(function() {
			if ($(this).is(':checked')) {
				cnt2++;
			}
		});
	}

	if ( flag == 1 && cnt == 0 ) {
		alert("Please select at least 1 device to extend reservation.");
		return;
	}
	var howto = "";
	$('input[name="extRadio"]').each(function() {
		if ($(this).is(':checked')) {
			howto = $(this).val();
		}
	});
			
	if (howto == "extend") {
		$('#ReserveApplyButton').show();
		$('#ReserveCancelButton').show();
		$('#ReserveEditButton').hide();
		$('#ReserveReleaseButton').hide();
		$('#ReserveGenerateReportButton').hide();
		$('#ReservationReserveCheckbox').attr('disabled',true);
		$('#extendReservation').dialog("close");
		globalPageIter = {};
		enableInputFields();
	} 
	$('#Alert2').dialog("close");
}
function extendCancelButton(){
		globalResourceId = [];
		$('.resres').removeClass('highlight');
		$('.resres').removeAttr('checked');
		$('.resres').removeAttr('disabled');
		$('#Alert2').dialog("close");
}
function CancelButton(){
		$('#Alert').dialog("close");
		$('#Alert2').dialog("close");
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : enableAdvancedFilter
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : to show advanced filter options
 #  PARAMETERS    :
 #
 #######################################################################
*/


function enableAdvancedFilter(){
	if($('#rmcheckboxadvancedFilter').is(':checked')){
		$('#advancedFilter').show();
	}else{
		$('#advancedFilter').hide();
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : EnableFilter
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : function that enables the dropdown for each options
 #  PARAMETERS    : src,item,id1,id2,id3,id4,id5
 #
 #######################################################################
*/
function EnableFilter(src,item,id1,id2,id3,id4,id5){
	if (src.checked){
		if (item == "software"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImortedDevices":
					EnableDisableFilterOptions(OSArray,0);
					EnableDisableFilterOptions(OSVerArray,1);
					EnableDisableFilterOptions(SWArray,2);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(OSArray4,0);
					EnableDisableFilterOptions(OSVerArray4,1);
					EnableDisableFilterOptions(SWArray4,2);
				break;
			}
		} else if (item == "system"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(nameArray,3);
					EnableDisableFilterOptions(ProdArray,4);
					EnableDisableFilterOptions(VerArray,5);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(nameArray4,3);
					EnableDisableFilterOptions(ProdArray4,4);
					EnableDisableFilterOptions(VerArray4,5);
				break;
			}
		} else if (item == "route"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(RouteNameArray,6);
					EnableDisableFilterOptions(RouteProdArray,7);
					EnableDisableFilterOptions(RouteVerArray,8);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(RouteNameArray4,6);
					EnableDisableFilterOptions(RouteProdArray4,7);
					EnableDisableFilterOptions(RouteVerArray4,8);
				break;
			}

		} else if (item == "embedded"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(EmbNameArray,9);
					EnableDisableFilterOptions(EmbProdArray,10);
					EnableDisableFilterOptions(EmbVerArray,11);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(EmbNameArray4,9);
					EnableDisableFilterOptions(EmbProdArray4,10);
					EnableDisableFilterOptions(EmbVerArray4,11);
				break;
			}

		} else if (item == "linecard"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(LineNameArray,12);
					EnableDisableFilterOptions(LineProdArray,13);
					EnableDisableFilterOptions(LineVerArray,14);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(LineNameArray4,12);
					EnableDisableFilterOptions(LineProdArray4,13);
					EnableDisableFilterOptions(LineVerArray4,14);
				break;
			}
		} else if (item == "module"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(ModNameArray,15);
					EnableDisableFilterOptions(ModProdArray,16);
					EnableDisableFilterOptions(ModVerArray,17);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(ModNameArray4,15);
					EnableDisableFilterOptions(ModProdArray4,16);
					EnableDisableFilterOptions(ModVerArray4,17);
				break;
			}
		} else if (item == "port"){
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(BWArray,18);
					EnableDisableFilterOptions(EncaArray,19);
					EnableDisableFilterOptions(TypeArray,20);
				break;
				case "ManageDevice":
					EnableDisableFilterOptions(BWArray4,18);
					EnableDisableFilterOptions(EncaArray4,19);
					EnableDisableFilterOptions(TypeArray4,20);
				break;
			}
		}
	} else{
		var toreset = new Array();
		if (item == "software"){

			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id3).attr('disabled',true);		
			toreset = [id1,id2,id3];

		}else if (item == "system"){
			
			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id3).attr('disabled',true);			
			toreset = [id1,id2,id3];

        }else if (item == "route"){
			
			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id4).attr('disabled',true);			
			toreset = [id1,id2,id3];

        }else if (item == "embedded"){

			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id3).attr('disabled',true);			
			toreset = [id1,id2,id3];

        }else if (item == "linecard"){

			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id3).attr('disabled',true);			
			toreset = [id1,id2,id3];

        }else if (item == "module"){

			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id3).attr('disabled',true);			
			toreset = [id1,id2,id3];

        }else if (item == "port"){

			$('#'+id1).attr('disabled',true);			
			$('#'+id2).attr('disabled',true);			
			$('#'+id3).attr('disabled',true);			
			toreset = [id1,id2,id3];
			var ctrp = true;
        }
		ResetFilterOptions(toreset,"1");
		if(!ctrp){
			$('#'+id1).trigger('onchange');
			$('#'+id2).trigger('onchange');
			$('#'+id3).trigger('onchange');
		}
	}
}

function EnableDisableFilterOptions(array,position) {
	var ex = "";
	switch (globalPageRM) {
		case "ManageDevice":
			ex = "4";
		break;
		case "ReservationDevice":
			ex = "2";
		break;
		case "admidev2":
			ex = "3";
		break;
	}	

	var attrib = new Array("OS","OSVersion","SW","sysName","Product","Version","routeName","routeProduct","routeVersion","embName","embProduct","embVersion","lineName","lineProduct","lineVersion","modName","modProduct","modVersion","portBand","portMedia","portType");

	if (data.length == 0) {
		$('#'+attrib[position]+"selF"+ex).attr('disabled',true);
	} else {
		$('#'+attrib[position]+"selF"+ex).attr('disabled',false);
	  }
}

function forFilterArray(src,type){

	var value = $(src).val();

	var str = type+"*"+value;

	if (FilterHolder){
		var flag =0;
		for (var i = 0; i < FilterHolder.length; i++){

			var data = FilterHolder[i].split("*");
			var col = data[0];

			if (col == type){
				FilterHolder.splice(i,1);
				if (value != "Any" && value != ""){
					FilterHolder.push(str);
				}
				flag = 1;
			}
	}
		if (flag == 0){
			if (value != "Any" && value != ""){
			FilterHolder.push(str);
			}
		}
	}else{
		if (value != "Any" && value != ""){
			FilterHolder.push(str);
		}
	}

	executeFilterArray();

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : executeFilterArray
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : executes the data chosen on the dropdown
 #  PARAMETERS    :
 #
 #######################################################################
*/
function executeFilterArray(){

	if (FilterHolder.length > 0){
		var valstr = FilterHolder.join(",");
		var domain = "";
		if (globalPageRM == "ReservationDevice")
			domain = prevDomainVal;
	//	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=dataforfilter&query=val='+valstr+'`domain='+domain+'`user='+globalUserName;
	 var url = getURL('RM4')+'action=dataforfilter&query={"QUERY":[{"val":"'+valstr+'","domain":"'+domain+'","user":"'+globalUserName+'"}]}';
		$.ajax({
			url: url,
			dataType: 'html',
			async: false,
			success: function(data){
				data = data.replace(/'/g,'"');
				var json = jQuery.parseJSON(data);
		
				EmptyFilterData();
				retData = $.trim(data);
				appendFilterData(retData);
			}
		});
	
		if ($('#PortFilter').is(":checked")){
			$("#portTypeselF").attr('disabled',false);
		
		}

	
	}else{
		OSArray = [];
		OSVerArray = [];
		SWArray = [];
		nameArray = [];
		ProdArray = [];
		VerArray = [];
		RouteNameArray = [];
		RouteProdArray = [];
		RouteVerArray = [];
		EmbNameArray = [];
		EmbProdArray = [];
		EmbVerArray = [];
		LineNameArray = [];
		LineProdArray = [];
		LineVerArray = [];
		ModNameArray = [];
		ModProdArray = [];
		ModVerArray = [];
		BWArray = [];
		TypeArray = [];
		EncaArray = [];

		EmptyFilterData();
		populateFilterDevice();
	}


}
/*
 #######################################################################
 #
 #  FUNCTION NAME : EmptyFilterData
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : function that empty all arrays on the filter
 #  PARAMETERS    :
 #
 #######################################################################
*/
function EmptyFilterData(){

	var ArrayData = ["OSType","OSVersion","Model","SoftwarePackage","ProductIdentifier","VersionIdentifier","RouteProcessorName","RouteProcessorPid","RouteProcessorVid","EmbeddedProcessorName","EmbeddedProcessorPid","EmbeddedProcessorVid","LineCard","LineCardPid","LineCardVid","Module","ModulePid","ModuleVid","Bandwidth","Media","Speed"];

	if (FilterHolder.length > 0){
		for (var j = 0; j < FilterHolder.length; j++){
			var data = FilterHolder[j].split("*");
			var column = data[0];
			for (var l = 0; l < ArrayData.length; l++){
				if (ArrayData[l] == column){

					ArrayData.splice(l,1);

				}

			}
		}
	}
	for (var x = 0;x < ArrayData.length; x++){
		
		switch(ArrayData[x]){
			case "OSType":
				$('#OSselF').empty().append("<option>Any</option>");
				emptyArr("1","1");
			break;
			case "OSVersion":
				$('#OSVersionselF').empty().append("<option>Any</option>");
				emptyArr("2","1");
			break;
			case "SoftwarePackage":
				$('#SWselF').empty().append("<option>Any</option>");
				emptyArr("3","1");
			break;
			case "Model":
				$('#sysNameselF').empty().append("<option>Any</option>");
				emptyArr("4","1");
			break;
			case "ProductIdentifier":
				$('#ProductselF').empty().append("<option>Any</option>");
				emptyArr("5","1");
			break;
			case "VersionIdentifier":	
				$('#VersionselF').empty().append("<option>Any</option>");
				emptyArr("6","1");
			break;
			case "RouteProcessorName":
				$('#routeNameselF').empty().append("<option>Any</option>");
				emptyArr("7","1");
			break;
			case "RouteProcessorPid":
				$('#routeProductselF').empty().append("<option>Any</option>");
				emptyArr("8","1");
			break;
			case "RouteProcessorVid":
				$('#routeVersionselF').empty().append("<option>Any</option>");
				emptyArr("9","1");
			break; 	
			case "EmbeddedProcessorName":
				$('#embNameselF').empty().append("<option>Any</option>");
				emptyArr("10","1");
			break;
			case "EmbeddedProcessorPid":
				$('#embProductselF').empty().append("<option>Any</option>");
				emptyArr("11","1");
			break;
			case "EmbeddedProcessorVid":
				$('#embVersionselF').empty().append("<option>Any</option>");
				emptyArr("12","1");
			break;		
			case "LineCard":
				$('#lineNameselF').empty().append("<option>Any</option>");
				emptyArr("13","1");
			break;
			case "LineCardPid":
				$('#lineProductselF').empty().append("<option>Any</option>");
				emptyArr("14","1");
			break;
			case "LineCardVid":
				$('#lineVersionselF').empty().append("<option>Any</option>");
				emptyArr("15","1");
			break;
			case "Module":
				$('#modNameselF').empty().append("<option>Any</option>");
				emptyArr("16","1");
			break;
			case "ModulePid":
				$('#modProductselF').empty().append("<option>Any</option>");
				emptyArr("17","1");
			break;
			case "ModuleVid":
				$('#modVersionselF').empty().append("<option>Any</option>");
				emptyArr("18","1");
			break;
			case "Bandwidth":
				$('#portBandselF').empty().append("<option>Any</option>");
				emptyArr("19","1");
			break;	 		
			case "Media":
				$('#portMediaselF').empty().append("<option>Any</option>");
				emptyArr("20","1");
			break;	 		
			case "Speed":
				$('#portTypeselF').empty().append("<option>Any</option>");
				emptyArr("21","1");
			break;	 		
		}
	}
	
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : populateFilterDevice
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : advanced filter for System option
 #  PARAMETERS    :
 #
 #######################################################################
*/
function populateFilterDevice() {

	if ( globalPageRM == 'ReservationDevices' ) {

		var data = getSystemInfo();
		var str1 = "<option>Any</option>",str2 = "<option>Any</option>", str3 = "<option>Any</option>",str4 = "<option>Any</option>",str5 = "<option>Any</option>",str6 = "<option>Any</option>";
		var checkstr1 = [];
	
	for (var i = 0; i < data.length; i++){
		if(checkstr1.indexOf(data[i].OSType) == -1){
			checkstr1.push(data[i].OSType);
			str1 += "<option>"+data[i].OSType+"</option>";
		}
		if(checkstr1.indexOf(data[i].OSVersion) == -1){
			checkstr1.push(data[i].OSVersion);
			str2 += "<option>"+data[i].OSVersion+"</option>";
		}
		if(checkstr1.indexOf(data[i].Model) == -1){
			checkstr1.push(data[i].Model);
			str3 += "<option>"+data[i].Model+"</option>";
		}
		if(checkstr1.indexOf(data[i].SoftwarePackage) == -1){
			checkstr1.push(data[i].SoftwarePackage);
			str4 += "<option>"+data[i].SoftwarePackage+"</option>";
		}
		if(checkstr1.indexOf(data[i].ProductIdentifier) == -1){
			checkstr1.push(data[i].ProductIdentifier);
			str5 += "<option>"+data[i].ProductIdentifier+"</option>";
		}
		if(checkstr1.indexOf(data[i].VersionIdentifier) == -1){
			checkstr1.push(data[i].VersionIdentifier);
			str6 += "<option>"+data[i].VersionIdentifier+"</option>";
		}
		

	}
	$('#OSselF').html(str1); 
	$('#OSVersionselF').html(str2); 
	$('#sysNameselF').html(str3); 	
	$('#SWselF').html(str4); 
	$('#ProductselF').html(str5); 
	$('#VersionselF').html(str6); 
		if (data == 0) {
			$('#systemFilter6').parent().parent().parent().parent().hide();
			$('#systemFilter6').parent().parent().parent().parent().next().hide();
		} else {
			$('#systemFilter6').parent().parent().parent().parent().show();
			$('#systemFilter6').parent().parent().parent().parent().next().show();
			if ($('#systemFilter6').is(":checked")) {
				EnableDisableFilterOptions(data,3);
				EnableDisableFilterOptions(data,4);
				EnableDisableFilterOptions(data,5);
			}
	      }

		if (data == 0) {
			$('#systemFilter').parent().parent().parent().parent().hide();
			$('#systemFilter').parent().parent().parent().parent().next().hide();
		} else {
			$('#systemFilter').parent().parent().parent().parent().show();
			$('#systemFilter').parent().parent().parent().parent().next().show();
			if ($('#systemFilter').is(":checked")) {
				EnableDisableFilterOptions(data,0);
				EnableDisableFilterOptions(data,1);
				EnableDisableFilterOptions(data,2);
			}
	      }

		populateRoute();
		populateEmbedded();
		populateLine();
		populateModule();
		populatePort();

	}

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : populateRoute
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : advanced filter for Route option
 #  PARAMETERS    :
 #
 #######################################################################
*/
function populateRoute(){

	var data = getRouteInfo();
	var str1 = "<option>Any</option>",str2 = "<option>Any</option>", str3 = "<option>Any</option>";
	var checkstr1 = [];
	
	for (var i = 0; i < data.length; i++){
		if(checkstr1.indexOf(data[i].VersionIdentifier) == -1){
			checkstr1.push(data[i].VersionIdentifier);
			str1 += "<option>"+data[i].VersionIdentifier+"</option>";
		}
		if(checkstr1.indexOf(data[i].Name) == -1){
			checkstr1.push(data[i].Name);
			str2 += "<option>"+data[i].Name+"</option>";
		}
		if(checkstr1.indexOf(data[i].ProductIdentifier) == -1){
			checkstr1.push(data[i].ProductIdentifier);
			str3 += "<option>"+data[i].ProductIdentifier+"</option>";
		}
		
	}
	$('#routeNameselF').html(str2); 
	$('#routeProductselF').html(str3); 
	$('#routeVersionselF').html(str1); 	
	if (data.length == 0) {
		$('#RouteFilter').parent().parent().parent().parent().hide();
		$('#RouteFilter').parent().parent().parent().parent().next().hide();
	} else {
		$('#RouteFilter').parent().parent().parent().parent().show();
		$('#RouteFilter').parent().parent().parent().parent().next().show();
		if ($('#RouteFilter').is(":checked")) {
			EnableDisableFilterOptions(data,6);
			EnableDisableFilterOptions(data,7);
			EnableDisableFilterOptions(data,8);
		}
      }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : populateEmbedded
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : advanced filter for Embedded option
 #  PARAMETERS    :
 #
 #######################################################################
*/
function populateEmbedded(){

	var data = getEmbedInfo();
	var str1 = "<option>Any</option>",str2 = "<option>Any</option>", str3 = "<option>Any</option>";
	var checkstr1 = [];
	
	for (var i = 0; i < data.length; i++){
		if(checkstr1.indexOf(data[i].VersionIdentifier) == -1){
			checkstr1.push(data[i].VersionIdentifier);
			str1 += "<option>"+data[i].VersionIdentifier+"</option>";
		}
		if(checkstr1.indexOf(data[i].Name) == -1){
			checkstr1.push(data[i].Name);
			str2 += "<option>"+data[i].Name+"</option>";
		}
		if(checkstr1.indexOf(data[i].ProductIdentifier) == -1){
			checkstr1.push(data[i].ProductIdentifier);
			str3 += "<option>"+data[i].ProductIdentifier+"</option>";
		}
		
	}
	$('#embVersionselF').html(str1);
	$('#embNameselF').html(str2);
	$('#embProductselF').html(str3);
	if (data == 0) {
		$('#EmbeddedFilter').parent().parent().parent().parent().hide();
		$('#EmbeddedFilter').parent().parent().parent().parent().next().hide();
	} else {
		$('#EmbeddedFilter').parent().parent().parent().parent().show();
		$('#EmbeddedFilter').parent().parent().parent().parent().next().show();
		if ($('#EmbeddedFilter').is(":checked")) {
			EnableDisableFilterOptions(data,9);
			EnableDisableFilterOptions(data,10);
			EnableDisableFilterOptions(data,11);
		}
      }

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : populateLine
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : advanced filter for Line Card option
 #  PARAMETERS    :
 #
 #######################################################################
*/
function populateLine(){

	var data = getLineCardInfo();
	var str1 = "<option>Any</option>",str2 = "<option>Any</option>", str3 = "<option>Any</option>";
	var checkstr1 = [];
	for (var i = 0; i < data.length; i++){
		if(checkstr1.indexOf(data[i].VersionIdentifier) == -1){
			checkstr1.push(data[i].VersionIdentifier);
			str1 += "<option>"+data[i].VersionIdentifier+"</option>";
		}
		if(checkstr1.indexOf(data[i].Name) == -1){
			checkstr1.push(data[i].Name);
			str2 += "<option>"+data[i].Name+"</option>";
		}
		if(checkstr1.indexOf(data[i].ProductIdentifier) == -1){
			checkstr1.push(data[i].ProductIdentifier);
			str3 += "<option>"+data[i].ProductIdentifier+"</option>";
		}
		
	}
	$('#lineNameselF').html(str2); 
	$('#lineProductselF').html(str3); 
	$('#lineVersionselF').html(str1); 	

	if (data == 0) {
		$('#LineFilter').parent().parent().parent().parent().hide();
		$('#LineFilter').parent().parent().parent().parent().next().hide();
	} else {
		$('#LineFilter').parent().parent().parent().parent().show();
		$('#LineFilter').parent().parent().parent().parent().next().show();
		if ($('#LineFilter').is(":checked")) {
			EnableDisableFilterOptions(data,12);
			EnableDisableFilterOptions(data,13);
			EnableDisableFilterOptions(data,14);
		}
      }
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : populateModule
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : advanced filter for Module option
 #  PARAMETERS    :
 #
 #######################################################################
*/
function populateModule(){

	var data = getModuleInfo();
	var str1 = "<option>Any</option>",str2 = "<option>Any</option>", str3 = "<option>Any</option>";
	var checkstr1 = [];
	for (var i = 0; i < data.length; i++){
		if(checkstr1.indexOf(data[i].VersionIdentifier) == -1){
			checkstr1.push(data[i].VersionIdentifier);
			str1 += "<option>"+data[i].VersionIdentifier+"</option>";
		}
		if(checkstr1.indexOf(data[i].Name) == -1){
			checkstr1.push(data[i].Name);
			str2 += "<option>"+data[i].Name+"</option>";
		}
		if(checkstr1.indexOf(data[i].ProductIdentifier) == -1){
			checkstr1.push(data[i].ProductIdentifier);
			str3 += "<option>"+data[i].ProductIdentifier+"</option>";
		}
		
	}
	$('#modNameselF').html(str2); 
	$('#modProductselF').html(str3); 
	$('#modVersionselF').html(str1); 	

	if (data == 0) {
		$('#ModuleFilter').parent().parent().parent().parent().hide();
		$('#ModuleFilter').parent().parent().parent().parent().next().hide();
	} else {
		$('#ModuleFilter').parent().parent().parent().parent().show();
		$('#ModuleFilter').parent().parent().parent().parent().next().show();
		if ($('#ModuleFilter').is(":checked")) {
			EnableDisableFilterOptions(data,15);
			EnableDisableFilterOptions(data,16);
			EnableDisableFilterOptions(data,17);
		}
      }
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : populatePort
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : advanced filter for Port option
 #  PARAMETERS    :
 #
 #######################################################################
*/
function populatePort(){

	var row = getPortInfo();

	var str1 = "<option>Any</option>",str2 = "<option>Any</option>", str3 = "<option>Any</option>";
	var checkstr1 = [];
	
	for (var i = 0; i < row.length; i++){
		if(checkstr1.indexOf(row[i].Speed) == -1){
			checkstr1.push(row[i].Speed);
			str1 += "<option>"+row[i].Speed+"</option>";
		}
		if(checkstr1.indexOf(row[i].MediaType) == -1){
			checkstr1.push(row[i].MediaType);
			str2 += "<option>"+row[i].MediaType+"</option>";
		}
		if(checkstr1.indexOf(row[i].Bandwidth) == -1){
			checkstr1.push(row[i].Bandwidth);
			str3 += "<option>"+row[i].Bandwidth+"</option>";
		}
		
	}
	$('#portTypeselF').html(str1); 
	$('#portMediaselF').html(str2); 
	$('#portBandselF').html(str3); 	

	if (row == 0) {
		$('#PortFilter').parent().parent().parent().parent().hide();
		$('#PortFilter').parent().parent().parent().parent().next().hide();
		$('#PortFilter').parent().parent().parent().parent().next().next().hide();
	} else {
		$('#PortFilter').parent().parent().parent().parent().show();
		$('#PortFilter').parent().parent().parent().parent().next().show();
		$('#PortFilter').parent().parent().parent().parent().next().next().show();
		if ($('#PortFilter').is(":checked")) {
			EnableDisableFilterOptions(row,18);
			EnableDisableFilterOptions(row,19);
			EnableDisableFilterOptions(row,20);
		}
      }

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : hideFilterDevice
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   :	promts clear filter 
 #  PARAMETERS    :
 #
 #######################################################################
*/
function hideFilterDevice(id,id2){

	if (id2 != "FilterDevice" && id2 != "FilterDevice4") {
		var tab = "";
		switch (id2) {
			case "FilterDevice2": tab = "resDom-0"; break;
			case "FilterDevice3": tab = "resDom-3"; break;
		}
	    if ($('#'+id).is(':checked')) {
			$('#'+id2).removeAttr('style');
		    var tabHt = $('#'+id2).height();
        	var origHt = $('#addRespolPopUp').height();
	        var newHt = parseInt(tabHt) + parseInt(origHt);
    	    $('#addRespolPopUp').height(newHt);
    	    $('#addRespolPopUp').parent().css('top','0px');
			$('#'+tab).attr("style","height:85%;overflow:auto");
	    } else {
        	var tabHt = $('#'+id2).height();
	        var origHt = $('#addRespolPopUp').height();
    	    var newHt = parseInt(origHt) - parseInt(tabHt);
			var windowHt = ($(window).height() - newHt)/2;
			$('#'+tab).attr("style","height:85%;");
        	$('#addRespolPopUp').height(newHt);
        	$('#addRespolPopUp').parent().css('top',windowHt+'px');
	        $('#'+id2).attr('style','display:none');
	      }
	} else {
	    if ($('#'+id).is(':checked')){
	        $('#'+id2).removeAttr('style');
			switch (id2) {
                case "FilterDevice": populateFilterDevice(); break;
                case "FilterDevice4": populateFilterDevice4(); break;
            }
	    } else {
	        $('#'+id2).attr('style','display: none');
			var hasfilters = 0;
			$('#systemFilter5').prop('checked',false);
			$('#sysNameselF4').attr('disabled',true);
			 $('#sysNameselF4').attr('value', "Any");
			$('#ProductselF4').attr('disabled',true);
			$('#VersionselF4').attr('disabled',true);
			if (id2 == "FilterDevice" && globalValueArr != "") {
				hasfilters = 1;
			} else if (id2 == "FilterDevice4" && globalStrFilter4 != "") {
				hasfilters = 1;
			}
			  }
			if (hasfilters == 1) {
				$('#Alert').dialog({
					autoOpen: false,
					resizable: false,
					modal: true,
					height: 150,
					width: 350,
					closeOnEscape: false,
					open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
					buttons: {
						"Yes": function() {
							$(this).dialog("close");
							clearFilterDevice();
							globalValueArr = [];	
						},
						"No": function() {
							$(this).dialog("close");
						}
					}
				});
				$('#Alert').empty().append("<b>Do you want to clear the filter?</b>");
				$('#Alert').dialog("open");
				$('.ui-dialog :button').blur();
				return;
   		  	}
			
		 }

}

function emptyArr(arrayNum,position) {

	switch(arrayNum) {
		case "1":
			switch (position) {
				case "1": OSArray = []; break;
				case "2": OSArray2 = []; break;
				case "3": OSArray3 = []; break;
				case "4": OSArray4 = []; break;
			}
		break;
		case "2":
			switch (position) {
				case "1": OSVerArray = []; break;
				case "2": OSVerArray2 = []; break;
				case "3": OSVerArray3 = []; break;
				case "4": OSVerArray4 = []; break;
			}
		break;
		case "3":
			switch (position) {
				case "1": SWArray = []; break;
				case "2": SWArray2 = []; break;
				case "3": SWArray3 = []; break;
				case "4": SWArray4 = []; break;
			}
		break;
		case "4":
			switch (position) {
				case "1": nameArray = []; break;
				case "2": nameArray2 = []; break;
				case "3": nameArray3 = []; break;
				case "4": nameArray4 = []; break;
			}
		break;
		case "5":
			switch (position) {
				case "1": ProdArray = []; break;
				case "2": ProdArray2 = []; break;
				case "3": ProdArray3 = []; break;
				case "4": ProdArray4 = []; break;
			}
		break;
		case "6":
			switch (position) {
				case "1": VerArray = []; break;
				case "2": VerArray2 = []; break;
				case "3": VerArray3 = []; break;
				case "4": VerArray4 = []; break;
			}
		break;
		case "7":
			switch (position) {
				case "1": RouteNameArray = []; break;
				case "2": RouteNameArray2 = []; break;
				case "3": RouteNameArray3 = []; break;
				case "4": RouteNameArray4 = []; break;
			}
		break;
		case "8":
			switch (position) {
				case "1": RouteProdArray = []; break;
				case "2": RouteProdArray2 = []; break;
				case "3": RouteProdArray3 = []; break;
				case "4": RouteProdArray4 = []; break;
			}
		break;
		case "9":
			switch (position) {
				case "1": RouteVerArray = []; break;
				case "2": RouteVerArray2 = []; break;
				case "3": RouteVerArray3 = []; break;
				case "4": RouteVerArray4 = []; break;
			}
		break;
		case "10":
			switch (position) {
				case "1": EmbNameArray = []; break;
				case "2": EmbNameArray2 = []; break;
				case "3": EmbNameArray3 = []; break;
				case "4": EmbNameArray4 = []; break;
			}
		break;
		case "11":
			switch (position) {
				case "1": EmbProdArray = []; break;
				case "2": EmbProdArray2 = []; break;
				case "3": EmbProdArray3 = []; break;
				case "4": EmbProdArray4 = []; break;
			}
		break;
		case "12":
			switch (position) {
				case "1": EmbVerArray = []; break;
				case "2": EmbVerArray2 = []; break;
				case "3": EmbVerArray3 = []; break;
				case "4": EmbVerArray4 = []; break;
			}
		break;
		case "13":
			switch (position) {
				case "1": LineNameArray = []; break;
				case "2": LineNameArray2 = []; break;
				case "3": LineNameArray3 = []; break;
				case "4": LineNameArray4 = []; break;
			}
		break;
		case "14":
			switch (position) {
				case "1": LineProdArray = []; break;
				case "2": LineProdArray2 = []; break;
				case "3": LineProdArray3 = []; break;
				case "4": LineProdArray4 = []; break;
			}
		break;
		case "15":
			switch (position) {
				case "1": LineVerArray = []; break;
				case "2": LineVerArray2 = []; break;
				case "3": LineVerArray3 = []; break;
				case "4": LineVerArray4 = []; break;
			}
		break;
		case "16":
			switch (position) {
				case "1": ModNameArray = []; break;
				case "2": ModNameArray2 = []; break;
				case "3": ModNameArray3 = []; break;
				case "4": ModNameArray4 = []; break;
			}
		break;
		case "17":
			switch (position) {
				case "1": ModProdArray = []; break;
				case "2": ModProdArray2 = []; break;
				case "3": ModProdArray3 = []; break;
				case "4": ModProdArray4 = []; break;
			}
		break;
		case "18":
			switch (position) {
				case "1": ModVerArray = []; break;
				case "2": ModVerArray2 = []; break;
				case "3": ModVerArray3 = []; break;
				case "4": ModVerArray4 = []; break;
			}
		break;
		case "19":
			switch (position) {
				case "1": BWArray = []; break;
				case "2": BWArray2 = []; break;
				case "3": BWArray3 = []; break;
				case "4": BWArray4 = []; break;
			}
		break;
		case "20":
			switch (position) {
				case "1": EncaArray = []; break;
				case "2": EncaArray2 = []; break;
				case "3": EncaArray3 = []; break;
				case "4": EncaArray4 = []; break;
			}
		break;
		case "21":
			switch (position) {
				case "1": TypeArray = []; break;
				case "2": TypeArray2 = []; break;
				case "3": TypeArray3 = []; break;
				case "4": TypeArray4 = []; break;
			}
		break;



	}



}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getValueFilter
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 6,2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : gets all values of filter
 #  PARAMETERS    :
 #
 #######################################################################
*/
var globalValueArr = [];
function getValuetoFilter(){
	var Software = new Array();
	var System = new Array();
	var Route= new Array();
	var Embedded = new Array();
	var Line = new Array();
	var Module = new Array();
	var Port = new Array();
	var AllValue = new Array();

	 Software[0] = $('#OSselF').val();
	 Software[1] = $('#OSVersionselF').val();
	 Software[2] = $('#SWselF').val();
	
	 System[0] = $('#sysNameselF').val();
	 System[1] = $('#ProductselF').val();
	 System[2] = $('#VersionselF').val();

	 Route[0] = $('#routeNameselF').val();
	 Route[1] = $('#routeProductselF').val();
	 Route[2] = $('#routeVersionselF').val();

	 Embedded[0] = $('#embNameselF').val();
	 Embedded[1] = $('#embProductselF').val();
	 Embedded[2] = $('#embVersionselF').val();

	 Line[0] = $('#lineNameselF').val();
	 Line[1] = $('#lineProductselF').val();
	 Line[2] = $('#lineVersionselF').val();

	 Module[0] = $('#modNameselF').val();
	 Module[1] = $('#modProductselF').val();
	 Module[2] = $('#modVersionselF').val();
	
	 Port[0] = $('#portBandselF').val();
	 Port[1] = $('#portTypeselF').val();
	 Port[2] = $('#portMediaselF').val();


	if (Software != ""){
		for (var i = 0;i < Software.length; i++){
			if (Software[i] != "Any"){
				if (i == 0){
					AllValue.push("DeviceRes.OSType^"+Software[i]);
				}else if (i == 1){
					AllValue.push("DeviceRes.OSVersion^"+Software[i]);
				}else if (i == 2){
					AllValue.push("DeviceRes.SoftwarePackage^"+Software[i]);
				}
			}
		}	
	}
	if (System != ""){
		for (var i = 0 ;i < System.length; i++){
			if (System[i] != "Any"){
				if (i == 0){
					AllValue.push("DeviceRes.Model^"+System[i]);
				}else if (i == 1){
					AllValue.push("DeviceRes.ProductIdentifier^"+System[i]);
				}else if (i == 2){
					AllValue.push("DeviceRes.VersionIdentifier^"+System[i]);
				}
			}
		}
	}

	if (Route != ""){
		for (var i = 0 ; i < Route.length; i++){
			if (Route[i] != "Any"){
				if (i == 0){
					AllValue.push("SlotRes.Name^"+Route[i]);
				}else if (i == 1){
					AllValue.push("SlotRes.ProductIdentifier^"+Route[i]);
				}else if (i == 2){
					AllValue.push("SlotRes.VersionIdentifier^"+Route[i]);
				}
			}
		}
	}

	if (Embedded != ""){
		for (var i = 0 ; i < Embedded.length; i++){
			if (Embedded[i] != "Any"){
				if (i == 0){
					AllValue.push("SlotRes.Name^"+Embedded[i]);
				}else if (i == 1){
					AllValue.push("SlotRes.ProductIdentifier^"+Embedded[i]);
				}else if (i == 2){
					AllValue.push("SlotRes.VersionIdentifier^"+Embedded[i]);
				}
			}
		}
	}

	if (Line != ""){
		for (var i = 0; i < Line.length; i++){
			if (Line[i] != "Any"){
				if (i == 0){
					AllValue.push("LineCardInformation.LineCard^"+Line[i]);
				}else if(i == 1){
					AllValue.push("LineCardInformation.LineCardPid^"+Line[i]);
				}else if(i == 2){
					AllValue.push("LineCardInformation.LineCardVid^"+Line[i]);
				}
			}
		}
	}
	
	if (Module != ""){
		for (var i = 0; i < Module.length; i++){
			if (Module[i] != "Any"){
				if (i == 0){				AllValue.push("ModuleInformation.Module^"+Module[i]);
				}else if(i == 1){
					AllValue.push("ModuleInformation.ModulePid^"+Module[i]);
				}else if(i == 2){
					AllValue.push("ModuleInformation.ModuleVid^"+Module[i]);
				}
			}
		}
	} 
	if (Port != ""){
		for (var i = 0; i < Port.length; i++){
			if (Port[i] != "Any"){
				if (i == 0){
					AllValue.push("PortRes.Bandwidth^"+Port[i]);
				} else if (i == 1){
					AllValue.push("PortRes.Speed^"+Port[i]);
				} else if (i == 2){
					AllValue.push("PortRes.MediaType^"+Port[i]);
				}
			}
		}
		//var type = getFilterPortType();
		//AllValue.push(type);
	}

	if (globalStrFilter == "" && AllValue.length == 0) {
		$('#systemFilter4').prop('checked',false);
		$('#systemFilter5').prop('checked',false);
		$('#RouteFilter4').prop('checked',false);
		$('#EmbeddedFilter4').prop('checked',false);
		$('#LineFilter4').prop('checked',false);
		$('#ModuleFilter4').prop('checked',false);
		$('#PortFilter4').prop('checked',false);
		$('#systemFilter').prop('checked',false);
		$('#systemFilter6').prop('checked',false);
		$('#RouteFilter').prop('checked',false);
		$('#EmbeddedFilter').prop('checked',false);
		$('#LineFilter').prop('checked',false);
		$('#ModuleFilter').prop('checked',false);
		$('#PortFilter').prop('checked',false);
		DisableAdvFilterDropDown();	
        displayWarning("<b>Nothing to filter</b>");
        return;
    }

    //$("#loading-container").empty().append(msg);
  //  $("#loading-container").dialog("open");
	
	globalFiltLoad = true;
	globalStrFilter5 = "*" + AllValue.join("*");
	globalFiltArray[prevDomainVal] = globalStrFilter5;
//	autoUpdate("ReservationDevice");
	loadDevicesHTML5();
	globalValueArr.push(AllValue);
}
function appendFilterData(retData){

	var info = retData.split("|");
	var ex = "";
	for (var k = 0;k < info.length; k++){
		if (info[k]){
			var data = info[k].split("*");
			var type = $.trim(data[0]);
			var value1 = $.trim(data[1]);
			if (value1 != ""){
				var value = "<option>"+value1+"</option>";
				switch (type){
					case "OSType":
						if ($.inArray(value1,OSArray) == -1){
							$('#OSselF'+ex).append(value);
							OSArray.push(value1);
						}
					break;
					case "OSVersion":
						if ($.inArray(value1,OSVerArray) == -1){
							$('#OSVersionselF'+ex).append(value);
							OSVerArray.push(value1);
						}
					break;
					case "SoftwarePackage":
						if ($.inArray(value1,SWArray) == -1){
							$('#SWselF'+ex).append(value);
							SWArray.push(value1);
						}
					break;
					case "Model":
						if ($.inArray(value1,nameArray) == -1){
							$('#sysNameselF'+ex).append(value);
							nameArray.push(value1);
						}
					break;
					case "ProductIdentifier":
						if ($.inArray(value1,ProdArray) == -1){
							$('#ProductselF'+ex).append(value);
							ProdArray.push(value1);
						}
					break;
					case "VersionIdentifier":	
						if ($.inArray(value1,VerArray) == -1){
							$('#VersionselF'+ex).append(value);
							VerArray.push(value1);
						}
					break;
					case "RouteProcessorName":
						if ($.inArray(value1,RouteNameArray) == -1){
							$('#routeNameselF'+ex).append(value);
							RouteNameArray.push(value1);
						}
					break;
					case "RouteProcessorPid":
						if ($.inArray(value1,RouteProdArray) == -1){
							$('#routeProductselF'+ex).append(value);
							RouteProdArray.push(value1);
						}
					break;
					case "RouteProcessorVid":
						if ($.inArray(value1,RouteVerArray) == -1){
							$('#routeVersionselF'+ex).append(value);
							RouteVerArray.push(value1);
						}
					break; 	
					case "EmbeddedProcessorName":
						if ($.inArray(value1,EmbNameArray) == -1){
							$('#embNameselF'+ex).append(value);
							EmbNameArray.push(value1);
						}
					break;
					case "EmbeddedProcessorPid":
						if ($.inArray(value1,EmbProdArray) == -1){
							$('#embProductselF'+ex).append(value);
							EmbProdArray.push(value1);
						}
					break;
					case "EmbeddedProcessorVid":
						if ($.inArray(value1,EmbVerArray) == -1){
							$('#embVersionselF'+ex).append(value);
							EmbVerArray.push(value1);
						}
					break;		
					case "LineCard":
						if ($.inArray(value1,LineNameArray) == -1){
							$('#lineNameselF'+ex).append(value);
							LineNameArray.push(value1);
						}
					break;
					case "LineCardPid":
						if ($.inArray(value1,LineProdArray) == -1){
							$('#lineProductselF'+ex).append(value);
							LineProdArray.push(value1);
						}
					break;
					case "LineCardVid":
						if ($.inArray(value1,LineVerArray) == -1){
							$('#lineVersionselF'+ex).append(value);
							LineVerArray.push(value1);
						}
					break;
					case "Module":
						if ($.inArray(value1,ModNameArray) == -1){
							$('#modNameselF'+ex).append(value);
							ModNameArray.push(value1);
						}
					break;
					case "ModulePid":
						if ($.inArray(value1,ModProdArray) == -1){
							$('#modProductselF'+ex).append(value);
							ModProdArray.push(value1);
						}
					break;
					case "ModuleVid":
						if ($.inArray(value1,ModVerArray) == -1){
							$('#modVersionselF'+ex).append(value);
							ModVerArray.push(value1);
						}
					break;
					case "Bandwidth":
						if ($.inArray(value1,BWArray) == -1){
							$('#portBandselF'+ex).append(value);
							BWArray.push(value1);
						}
					break;
					case "Media":
						if ($.inArray(value1,EncaArray) == -1){
							$('#portMediaselF'+ex).append(value);
							EncaArray.push(value1);
						}
					break;
					case "Speed":
						if ($.inArray(value1,TypeArray) == -1){
							$('#portTypeselF'+ex).append(value);
							TypeVerArray.push(value1);
						}
					break;
				}	
			}
		}
	}


	countOptionArray();

}
function countOptionArray() {

	var ex = "";
	var ex2 = "6";
	switch (globalPageRM) {
		case "ManageDevice":
			ex = "4";
			ex2= "5";
		break;
	}

	var a1 = $('#OSselF'+ex+' option').length;
	var a2 = $('#OSVersionselF'+ex+' option').length;
	var a3 = $('#sysNameselF'+ex+' option').length;
	var a4 = $('#SWselF'+ex+' option').length;
	var a5 = $('#ProductselF'+ex+' option').length;
	var a6 = $('#VersionselF'+ex+' option').length;
	var a7 = $('#routeNameselF'+ex+' option').length;
	var a8 = $('#routeProductselF'+ex+' option').length;
	var a9 = $('#routeVersionselF'+ex+' option').length;
	var a10 = $('#embNameselF'+ex+' option').length;
	var a11 = $('#embProductselF'+ex+' option').length;
	var a12 = $('#embVersionselF'+ex+' option').length;
	var a13 = $('#lineNameselF'+ex+' option').length;
	var a14 = $('#lineProductselF'+ex+' option').length;
	var a15 = $('#lineVersionselF'+ex+' option').length;
	var a16 = $('#modNameselF'+ex+' option').length;
	var a17 = $('#modProductselF'+ex+' option').length;
	var a18 = $('#modVersionselF'+ex+' option').length;
	var a19 = $('#portBandselF'+ex+' option').length;
	var a20 = $('#portMediaselF'+ex+' option').length;
	var a21 = $('#portTypeselF'+ex+' option').length;

	if (a3 == 1 && a5 == 1 && a6 == 1) {
		$('#systemFilter'+ex2).parent().parent().parent().parent().hide();
		$('#systemFilter'+ex2).parent().parent().parent().parent().next().hide();
	} else {
		$('#systemFilter'+ex2).parent().parent().parent().parent().show();
		$('#systemFilter'+ex2).parent().parent().parent().parent().next().show();
		if ($('#systemFilter'+ex2).is(":checked")) {
			switch (globalLoad) {
				case "rmResDev": case "rmResDev2":
					EnableDisableFilterOptions(nameArray,3);
					EnableDisableFilterOptions(ProdArray,4);
					EnableDisableFilterOptions(VerArray,5);
				break;
				case "rmManDev":
					EnableDisableFilterOptions(nameArray4,3);
					EnableDisableFilterOptions(ProdArray4,4);
					EnableDisableFilterOptions(VerArray4,5);
				break;
				case "admidev":
					EnableDisableFilterOptions(nameArray2,3);
					EnableDisableFilterOptions(ProdArray2,4);
					EnableDisableFilterOptions(VerArray2,5);
				break;
				case "admidev2":
					EnableDisableFilterOptions(nameArray3,3);
					EnableDisableFilterOptions(ProdArray3,4);
					EnableDisableFilterOptions(VerArray3,5);
				break;
			}
		}
	  }
	if (a1 == 1 && a2 == 1 && a4 == 1) {
		$('#systemFilter'+ex).parent().parent().parent().parent().hide();
		$('#systemFilter'+ex).parent().parent().parent().parent().next().hide();
	} else {
		$('#systemFilter'+ex).parent().parent().parent().parent().show();
		$('#systemFilter'+ex).parent().parent().parent().parent().next().show();
		if ($('#systemFilter'+ex).is(":checked")) {
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(OSArray,0);
					EnableDisableFilterOptions(OSVerArray,1);
					EnableDisableFilterOptions(SWArray,2);
				break;
				case "ManageDevices":
					EnableDisableFilterOptions(OSArray4,0);
					EnableDisableFilterOptions(OSVerArray4,1);
					EnableDisableFilterOptions(SWArray4,2);
				break;
			}
		}
	  }
	if (a8 == 1 && a7 == 1 && a9 == 1) {
		$('#RouteFilter'+ex).parent().parent().parent().parent().hide();
		$('#RouteFilter'+ex).parent().parent().parent().parent().next().hide();
	} else {
		$('#RouteFilter'+ex).parent().parent().parent().parent().show();
		$('#RouteFilter'+ex).parent().parent().parent().parent().next().show();
		if ($('#RouteFilter'+ex).is(":checked")) {
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(RouteNameArray,6);
					EnableDisableFilterOptions(RouteProdArray,7);
					EnableDisableFilterOptions(RouteVerArray,8);
				break;
				case "ManageDevices":
					EnableDisableFilterOptions(RouteNameArray4,6);
					EnableDisableFilterOptions(RouteProdArray4,7);
					EnableDisableFilterOptions(RouteVerArray4,8);
	
				break;
			
			}
		}else{
			$("#routeVersionselF4").val("Any");
		}
      }
	if (a10 == 1 && a11 == 1 && a12 == 1) {
		$('#EmbeddedFilter'+ex).parent().parent().parent().parent().hide();
		$('#EmbeddedFilter'+ex).parent().parent().parent().parent().next().hide();
	} else {
		$('#EmbeddedFilter'+ex).parent().parent().parent().parent().show();
		$('#EmbeddedFilter'+ex).parent().parent().parent().parent().next().show();
		if ($('#EmbeddedFilter'+ex).is(":checked")) {
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(EmbNameArray,9);
					EnableDisableFilterOptions(EmbProdArray,10);
					EnableDisableFilterOptions(EmbVerArray,11);
				break;
				case "ManageDevices":
					EnableDisableFilterOptions(EmbNameArray4,9);
					EnableDisableFilterOptions(EmbProdArray4,10);
					EnableDisableFilterOptions(EmbVerArray4,11);
				break;
		    }
		
		}
      }

	if (a13 == 1 && a14 == 1 && a15 == 1) {
		$('#LineFilter'+ex).parent().parent().parent().parent().hide();
		$('#LineFilter'+ex).parent().parent().parent().parent().next().hide();
	} else {
		$('#LineFilter'+ex).parent().parent().parent().parent().show();
		$('#LineFilter'+ex).parent().parent().parent().parent().next().show();
		if ($('#LineFilter'+ex).is(":checked")) {
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(LineNameArray,12);
					EnableDisableFilterOptions(LineProdArray,13);
					EnableDisableFilterOptions(LineVerArray,14);
				break;
				case "ManageDevices":
					EnableDisableFilterOptions(LineNameArray4,12);
					EnableDisableFilterOptions(LineProdArray4,13);
					EnableDisableFilterOptions(LineVerArray4,14);
				break;
			}
		}
      }
	if (a16 == 1 && a17 == 1 && a18 == 1) {
		$('#ModuleFilter'+ex).parent().parent().parent().parent().hide();
		$('#ModuleFilter'+ex).parent().parent().parent().parent().next().hide();
	} else {
		$('#ModuleFilter'+ex).parent().parent().parent().parent().show();
		$('#ModuleFilter'+ex).parent().parent().parent().parent().next().show();
		if ($('#ModuleFilter'+ex).is(":checked")) {
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(ModNameArray,15);
					EnableDisableFilterOptions(ModProdArray,16);
					EnableDisableFilterOptions(ModVerArray,17);
				break;
				case "ManageDevices":
					EnableDisableFilterOptions(ModNameArray4,15);
					EnableDisableFilterOptions(ModProdArray4,16);
					EnableDisableFilterOptions(ModVerArray4,17);
				break;
		    }
		}
      }

	if (a20 == 1 && a21 == 1 && a19 == 1) {
		$('#PortFilter'+ex).parent().parent().parent().parent().hide();
		$('#PortFilter'+ex).parent().parent().parent().parent().next().hide();
		$('#PortFilter'+ex).parent().parent().parent().parent().next().next().hide();
	} else {
		$('#PortFilter'+ex).parent().parent().parent().parent().show();
		$('#PortFilter'+ex).parent().parent().parent().parent().next().show();
		$('#PortFilter'+ex).parent().parent().parent().parent().next().next().show();
		if ($('#PortFilter'+ex).is(":checked")) {
			switch (globalPageRM) {
				case "ReservationDevices": case "ReservationImportedDevices":
					EnableDisableFilterOptions(BWArray,18);
					EnableDisableFilterOptions(EncaArray,19);
					EnableDisableFilterOptions(TypeArray,20);
				break;
				case "ManageDevices":
					EnableDisableFilterOptions(BWArray4,18);
					EnableDisableFilterOptions(EncaArray4,19);
					EnableDisableFilterOptions(TypeArray4,20);
				break;

		   }
		}
      }
}
function clearFilterDevice(){

	var ex = "";
	var ex2 = "6";
	switch (globalPageRM) {
		case "ReservationDevice":
				$('#systemFilter').prop('checked',false);
				$('#systemFilter6').prop('checked',false);
				$('#RouteFilter').prop('checked',false);
				$('#EmbeddedFilter').prop('checked',false);
				$('#LineFilter').prop('checked',false);
				$('#ModuleFilter').prop('checked',false);
				$('#PortFilter').prop('checked',false);
				DisableAdvFilterDropDown();	

			if (globalFiltArray[prevDomainVal] == undefined || globalFiltArray[prevDomainVal] == "") {
				alerts("<b>Nothing to clear</b>");
				return;
			}else{
				var msg = '<br/><br/>Clearing Filter...<br/><br/><img src="img/ajax-loader.gif">';
                $("#RMDevices-table").empty().append(msg);
                $("#RMDevices-table").dialog("open");
				globalValueArr	= [];
			}
			globalStrFilter5 = "";
			globalFiltArray[prevDomainVal] = "";
		break;
		case "ManageDevice":
			if (globalStrFilter4 == "") {
				$('#systemFilter4').prop('checked',false);
				$('#systemFilter5').prop('checked',false);
				$('#RouteFilter4').prop('checked',false);
				$('#EmbeddedFilter4').prop('checked',false);
				$('#LineFilter4').prop('checked',false);
				$('#ModuleFilter4').prop('checked',false);
				$('#PortFilter4').prop('checked',false);
				DisableAdvFilterDropDown();	
				displayWarning("<b>Nothing to clear</b>");
				return;
			} else {
                var msg = '<br/><br/>Clearing Filter...<br/><br/><img src="img/ajax-loader.gif">';
                $("#RMManageDevice-table").empty().append(msg);
                $("#RMManageDevice-table").dialog("open");
				globalValueArr = [];
            }
			globalStrFilter4 = "";
			ex = "4";
			ex2 = "5";
		break;
	}
	globalFiltLoad = true; 
	DisableAdvFilterDropDown();
	$('#systemFilter'+ex).prop('checked',false);
	$('#systemFilter'+ex2).prop('checked',false);
	$('#RouteFilter'+ex).prop('checked',false);
	$('#EmbeddedFilter'+ex).prop('checked',false);
	$('#ModuleFilter'+ex).prop('checked',false);
	$('#LineFilter'+ex).prop('checked',false);
	$('#PortFilter'+ex).prop('checked',false);
	var toreset = new Array('software','OSselF'+ex,'OSVersionselF'+ex,'SWselF'+ex,'sysNameselF'+ex,'ProductselF'+ex,'VersionselF'+ex,'routeNameselF'+ex,'routeProductselF'+ex,'routeVersionselF'+ex,'embNameselF'+ex,'embProductselF'+ex,'embVersionselF'+ex,'modNameselF'+ex,'modProductselF'+ex,'modVersionselF'+ex,'lineNameselF'+ex,'lineProductselF'+ex,'lineVersionselF'+ex,'portTypeselF'+ex,'portMediaselF'+ex,'portBandselF'+ex);
	ResetFilterOptions(toreset,"0");
	globalStrFilter5 = "";
	loadDevicesHTML5();
}
function ResetFilterOptions(ids, flag) {

	for (var b = 0 ; b < ids.length; b++) {
		if (ids[b] != "") {
			$('#'+ids[b]).val('Any');
		}

	}

	if (flag == 0) {
		switch (globalPageRM) {
			case "ReservationDevices":
				OSArray = [];
	    		OSVerArray = [];
			    SWArray = [];
			    nameArray = [];
	    		ProdArray = [];
			    VerArray = [];
	    		RouteNameArray = [];
			    RouteProdArray = [];
	    		RouteVerArray = [];
				EmbNameArray = [];
	    		EmbProdArray = [];
			    EmbVerArray = [];
	    		LineNameArray = [];
			    LineProdArray = [];
	    		LineVerArray = [];
			    ModNameArray = [];
	    		ModProdArray = [];
			    ModVerArray = [];
	    		BWArray = [];
			    TypeArray = [];
	    		EncaArray = [];
			    EmptyFilterData();
				populateFilterDevice();

			break;
			case "ManageDevice":
				OSArray4 = [];
	    		OSVerArray4 = [];
			    SWArray4 = [];
			    nameArray4 = [];
	    		ProdArray4 = [];
			    VerArray4 = [];
	    		RouteNameArray4 = [];
			    RouteProdArray4 = [];
	    		RouteVerArray4 = [];
				EmbNameArray4 = [];
	    		EmbProdArray4 = [];
			    EmbVerArray4 = [];
	    		LineNameArray4 = [];
			    LineProdArray4 = [];
	    		LineVerArray4 = [];
			    ModNameArray4 = [];
	    		ModProdArray4 = [];
			    ModVerArray4 = [];
	    		BWArray4 = [];
			    TypeArray4 = [];
	    		EncaArray4 = [];
			    EmptyFilterData2("2");
				populateFilterDevice4();
			break;
		}

	} 	
}
function DisableAdvFilterDropDown(){
    $("#sysNameselF").attr('disabled',true);
    $("#ProductselF").attr('disabled',true);
    $("#VersionselF").attr('disabled',true);
    $("#routeNameselF").attr('disabled',true);
    $("#routeProductselF").attr('disabled',true);
    $("#routeVersionselF").attr('disabled',true);
    $("#embNameselF").attr('disabled',true);
    $("#embProductselF").attr('disabled',true);
    $("#embVersionselF").attr('disabled',true);
    $("#lineNameselF").attr('disabled',true);
    $("#lineProductselF").attr('disabled',true);
    $("#lineVersionselF").attr('disabled',true);
    $("#modNameselF").attr('disabled',true);
    $("#modProductselF").attr('disabled',true);
    $("#modVersionselF").attr('disabled',true);
    $("#portTypeselF").attr('disabled',true);
    $("#portMediaselF").attr('disabled',true);
    $("#portBandselF").attr('disabled',true);
    $("#OSselF").attr('disabled',true);
    $("#OSVersionselF").attr('disabled',true);
    $("#SWselF").attr('disabled',true);

    $("#sysNameselF4").attr('disabled',true);
    $("#ProductselF4").attr('disabled',true);
    $("#VersionselF4").attr('disabled',true);
    $("#routeNameselF4").attr('disabled',true);
    $("#routeProductselF4").attr('disabled',true);
    $("#routeVersionselF4").attr('disabled',true);
    $("#embNameselF4").attr('disabled',true);
    $("#embProductselF4").attr('disabled',true);
    $("#embVersionselF4").attr('disabled',true);
    $("#lineNameselF4").attr('disabled',true);
    $("#lineProductselF4").attr('disabled',true);
    $("#lineVersionselF4").attr('disabled',true);
    $("#modNameselF4").attr('disabled',true);
    $("#modProductselF4").attr('disabled',true);
    $("#modVersionselF4").attr('disabled',true);
    $("#portTypeselF4").attr('disabled',true);
    $("#portMediaselF4").attr('disabled',true);
    $("#portBandselF4").attr('disabled',true);
    $("#OSselF4").attr('disabled',true);
    $("#OSVersionselF4").attr('disabled',true);
    $("#SWselF4").attr('disabled',true);

}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : rmReloadTable
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 13,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : RM Limit by and reload page
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function rmReloadTable(){
	if(globalPageRM == "ReservationReserve"){
		loadReserve();
	}else if(globalPageRM == "ReservationConnectivity"){
		loadConnectivity();
	}else if(globalPageRM == "ReservationPort"){
		loadPort();
	}else if(globalPageRM == "ReservationDevices"){
		loadDevicesHTML5();
	}else if(globalPageRM == "ReservationImportedDevices"){
		loadImportedDevices();
	}else if(globalPageRM == "ReservationHistory"){
		loadHistory();
	}else if(globalPageRM == "SchedulerEvent"){
		loadEventScheduler();
	}else if(globalPageRM == "SchedulerHistory"){
		loadHistorySched();
	}else if(globalPageRM == "ConfigurationInfo"){
		loadHistoryScheduler2();
	}
	rmRibbon();
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : rmRibbon
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 13,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : dynamic ribbon for RM
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function rmRibbon(){

	if(globalPageRM.substring(0,11) == "Reservation"){
		$('#spanReservation').text("Reservation");
		$('#spanRMRibbon').text(globalPageRM.substring(11,globalPageRM.length));
	}else if(globalPageRM.substring(0,9) == "Scheduler"){
		$('#spanReservation').text("Scheduler");
		$('#spanRMRibbon').text(globalPageRM.substring(9,globalPageRM.length));

	}
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : rmPagination
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 14,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : pagination
 *  #  PARAMETERS    :
 *  #
 *  #######################################################################
 *  */


function rmPagination(pages,page,total){
    $('#RMTotalPages').html(pages);
    $('#RMPageNumber').html(page);
    $("#RMTotalMatches").html(total);
    var str = "";


    for (var l = 1,m=0,n=4; l <= pages && m < 6 && n>-1; l++,m++,n--) {
         if (page <= 5) {
            str+="<a href='#' class='togglePage' style='text-decoration:none;color:#39599C;' id='RMPages"+l+"'>"+l+"</a>&nbsp";

         } else {
            str+="<a href='#' class='togglePage' style='text-decoration:none;color:#39599C;' id='RMPages"+(page-n)+"'>"+(page-n)+"</a>&nbsp";
 
         }
    }
    $('#RMPages').html(str);
	$('.togglePage').click(function(){
		$('#RMPageNumber').html($(this).text());
		rmReloadTable();
	});
}
/*
 *  #######################################################################
 *  #
 *  #  FUNCTION NAME : setPagination
 *  #  AUTHOR        : Angeline Bringas
 *  #  DATE          : March 14,2014
 *  #  MODIFIED BY   : 
 *  #  REVISION DATE : 
 *  #  REVISION #    : 
 *  #  DESCRIPTION   : pagination
 *  #  PARAMETERS    : type
 *  #
 *  #######################################################################
 *  */


function setPagination(type){
    var curr = parseInt($('#RMPageNumber').text());
    var totalpage = $('#RMTotalPages').text();
    switch(type){
        case "first":
            curr = 1;
        break;
        case "prev":
            if(curr > 1){
                curr = curr - 1;
            }
        break;
        case "next":
            if(curr < totalpage){
                curr = curr + 1;
            }
        break;
        case "last":
            curr = totalpage;
        break;
    }
    $('#RMPageNumber').text(curr);
	rmReloadTable();
}
function applySameDuration() {
	clname = "resres";
	globalDevArr=[];
	if ($('#toAppExt').val() == "Specific") {
		$('input[name="specDevSel"]').each(function() {
    		if ($(this).is(':checked')) {
        		//globDev = $(this).val();
        		if ($.inArray($(this).val(),globalDevArr) == -1) {
					globalDevArr.push($(this).val());
				}
    		}
		});
	} else {
		globDev = "all";	
		$('input[name="specDevSel"]').each(function() {
        	if ($.inArray($(this).val(),globalDevArr) == -1) {
				globalDevArr.push($(this).val());
			}
		});
	  }

	if (globalPageRM == "ReservationReserve") {
		if ($('#iterExt').val() == "Specific") {
			$('input[name="specIterSel"]').each(function() {
    			if ($(this).is(':checked')) {
        			//globDev = $(this).val();
        			if ($.inArray($(this).val(),globalIterArr) == -1) {
						globalIterArr.push($(this).val());
					}
    			}
			});
		} else {
			globIter = "all";
			if ($('#iterExt').parent().parent().is(':visible') == true) {
				$('input[name="specIterSel"]').each(function() {
    	    		if ($.inArray($(this).val(),globalIterArr) == -1) {
						globalIterArr.push($(this).val());
    				}
				});
			} else {
				$('.'+clname).each(function() {
					if ($(this).parent().parent().hasClass('highlight')) {
        				if ($.inArray($(this).attr('iter'),globalIterArr) == -1) {
							globalIterArr.push($(this).attr('iter'));
    					}
					}
				});
			  }
	  	}
	} else {
		globIter = "all";
		$('.'+clname).each(function() {
			if ($(this).parent().parent().hasClass('highlight')) {
        		if ($.inArray($(this).attr('iter'),globalIterArr) == -1) {
					globalIterArr.push($(this).attr('iter'));
    			}
			}
		});
	  }	
	globalIterArr = globalIterArr.sort();
	var resid;
	var uname = "";
	$('.'+clname).each(function() {
		if ($(this).parent().parent().hasClass('highlight')) {
			resid = $(this).attr('rIds');
			uname = $(this).parent().parent().find('td').eq(10).find('span').text();
		}
	});
	var origInfo = {};
	var sdate,stime,edate,etime,inter,diff,newdiff;
	var newendinfo = new Array();
	var newstartinfo = new Array();
	var diffInit = 0;
	for (var d = 0; d < globalIterArr.length; d++) {
		for (var f = 0; f < globalDevArr.length; f++) {
			$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	      		sdate = $(this).parent().parent().find('td').eq(8).find('input').val();
				stime = $(this).parent().parent().find('td').eq(9).find('input').val();
   				edate = $(this).parent().parent().find('td').eq(17).find('input').val();
	   			etime = $(this).parent().parent().find('td').eq(18).find('input').val();
   				inter = $(this).parent().parent().find('td').eq(13).find('input').val();
			});
		}
		origInfo[globalIterArr[d]] = sdate+"^"+stime+"^"+inter+"^"+edate+"^"+etime;
	}

	for (var d = 0; d < globalIterArr.length; d++) {
		//MADUGONG COMPUTATION
		if (d == 0) {
			for (var f = 0; f < globalDevArr.length; f++) {
				if (f == 0) {
					$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	       		    	sdate = $(this).parent().parent().find('td').eq(8).find('input').val();
						stime = $(this).parent().parent().find('td').eq(9).find('input').val();
   					    edate = $(this).parent().parent().find('td').eq(17).find('input').val();
	   					etime = $(this).parent().parent().find('td').eq(18).find('input').val();
   						inter = $(this).parent().parent().find('td').eq(13).find('input').val();
	
					});
					var year1 = sdate.split("-")[0];
					var month1 = sdate.split("-")[1];
					var day1 = sdate.split("-")[2];
					var hh1 = stime.split(":")[0];
					var mm1 = stime.split(":")[1];
					var ss1 = stime.split(":")[2];
					var year2 = edate.split("-")[0];
					var month2 = edate.split("-")[1];
					var day2 = edate.split("-")[2];
					var hh2 = etime.split(":")[0];
					var mm2 = etime.split(":")[1];
					var ss2 = etime.split(":")[2];

					if (/^0/i.test(month1)) {
						month1 = month1[1] - 1;
					} else {
						month1 -= 1;
				  	  }
				
				if (/^0/i.test(month2)) {
					month2 = month2[1] - 1;
				} else {
					month2 -= 1;
				}	

				var j = new Date(year1,month1,day1,hh1,mm1,ss1);
				var k = new Date(year2,month2,day2,hh2,mm2,ss2);
				diff = (k-j);
				newdiff = diff * 2;
				newendinfo = computeMeNow(edate,etime,diff);
				$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   				$(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   					$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
				});
				if (inter != 0) {
					inter = inter * 60 * 1000;
				}
				newstartinfo = computeMeNow(newendinfo[0],newendinfo[1],inter);
				$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   					$(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   					$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
				});
			} else {
				$('#ReservationReser_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   				$(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   					$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
				});
				$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   					$(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   					$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
				});
			  }
			}
		} else {
			for (var f = 0; f < globalDevArr.length; f++) {
				if (f == 0) {
					$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
				    	sdate = $(this).parent().parent().find('td').eq(8).find('input').val();
						stime = $(this).parent().parent().find('td').eq(9).find('input').val();
   						inter = $(this).parent().parent().find('td').eq(13).find('input').val();
					});
					newendinfo = computeMeNow(sdate,stime,newdiff);
					$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   				    $(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   						$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
					});
					if (inter != 0) {
						inter = inter * 60 * 1000;
					}
					newstartinfo = computeMeNow(newendinfo[0],newendinfo[1],inter);
					$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   					    $(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   						$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
					});
				} else {
					$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   				    $(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   						$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
					});
					$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   					    $(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   						$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
					});
				  }
			}
          }
	}

	var resArr =  getResLimit();
	var min = resArr.split("^")[0];
	var max = resArr.split("^")[1];
	if (diff < 600000) {
		alerts("<b>Unable to proceed. New reservation time should not be less than 10 minutes.</b>","","$('#Alert').parent().find('.ui-dialog-buttonpane button:contains(\"OK\")').button('enable');$('#Alert').parent().find('.ui-dialog-buttonpane button:contains(\"Cancel\")').button('enable');")
		$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('OK')").button("disable");
		$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('Cancel')").button("disable");
		return;
	} else if (diff > max) {
		alerts("<b>Unable to proceed. New reservation time should not be greater than the maximum reservation time limit.</b>","","$('#Alert').parent().find('.ui-dialog-buttonpane button:contains(\"OK\")').button('enable');$('#Alert').parent().find('.ui-dialog-buttonpane button:contains(\"Cancel\")').button('enable');")
		$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('OK')").button("disable");
		$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('Cancel')").button("disable");
		return;
	  }
	
	//DISPLAY USER KUNG ANO NA YUNG NEW RESERVATION INFORMATION
	$('#Alert2').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons: {
			"Apply": function() {
				$(this).empty().dialog('destroy');
				$('#Alert').empty().dialog('destroy');
				for (var d = 0; d < globalIterArr.length; d++) {
					//MADUGONG COMPUTATION
					if (d == 0) {
						for (var f = 0; f < globalDevArr.length; f++) {
							if (f == 0) {
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	       				    		sdate = $(this).parent().parent().find('td').eq(8).find('input').val();
									stime = $(this).parent().parent().find('td').eq(9).find('input').val();
   					    			edate = $(this).parent().parent().find('td').eq(17).find('input').val();
	   								etime = $(this).parent().parent().find('td').eq(18).find('input').val();
   									inter = $(this).parent().parent().find('td').eq(13).find('input').val();
								});
								var year1 = sdate.split("-")[0];
								var month1 = sdate.split("-")[1];
								var day1 = sdate.split("-")[2];
								var hh1 = stime.split(":")[0];
								var mm1 = stime.split(":")[1];
								var ss1 = stime.split(":")[2];
								var year2 = edate.split("-")[0];
								var month2 = edate.split("-")[1];
								var day2 = edate.split("-")[2];
								var hh2 = etime.split(":")[0];
								var mm2 = etime.split(":")[1];
								var ss2 = etime.split(":")[2];

								if (/^0/i.test(month1)) {
									month1 = month1[1] - 1;
								} else {
									month1 -= 1;
				 				  }
				
								if (/^0/i.test(month2)) {
									month2 = month2[1] - 1;
								} else {
									month2 -= 1;
				  				  }	

								var j = new Date(year1,month1,day1,hh1,mm1,ss1);
								var k = new Date(year2,month2,day2,hh2,mm2,ss2);
								diff = (k-j);
								newdiff = diff * 2;
								newendinfo = computeMeNow(edate,etime,diff);
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   								$(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   									$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
								});
								if (inter != 0) {
									inter = inter * 60 * 1000;
								}
								newstartinfo = computeMeNow(newendinfo[0],newendinfo[1],inter);
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   									$(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   									$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
								});
							} else {
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   								$(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   									$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
								});
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   									$(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   									$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
								});
			  				  }
						}
					} else {
						for (var f = 0; f < globalDevArr.length; f++) {
							if (f == 0) {
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
				    				sdate = $(this).parent().parent().find('td').eq(8).find('input').val();
									stime = $(this).parent().parent().find('td').eq(9).find('input').val();
   									inter = $(this).parent().parent().find('td').eq(13).find('input').val();
								});
								newendinfo = computeMeNow(sdate,stime,newdiff);
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   				    			$(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   									$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
								});
								if (inter != 0) {
									inter = inter * 60 * 1000;
								}
								newstartinfo = computeMeNow(newendinfo[0],newendinfo[1],inter);
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   					    			$(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   									$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
								});
							} else {
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	   				   				$(this).parent().parent().find('td').eq(17).find('input').val(newendinfo[0]);
   									$(this).parent().parent().find('td').eq(18).find('input').val(newendinfo[1]);
								});
								$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d+1]+'"]').each (function() {
   					    			$(this).parent().parent().find('td').eq(8).find('input').val(newstartinfo[0]);
   									$(this).parent().parent().find('td').eq(9).find('input').val(newstartinfo[1]);
								});
				  			   }
						}
          			 }
				}
				enableInputFields();
//				extendReservation();
				reserveExtendApply();
			},
			"Cancel": function() {
				$(this).dialog('destroy');
	//			$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('OK')").button("enable");
	//			$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('Cancel')").button("enable");
				/*var verifySelected  = '<br/><br/>Recalculating Previous Information...<br/><br/><img src="../styles/images/preloader.gif">';
				$("#loading-container").empty().append(verifySelected);
			    $("#loading-container").dialog("open");
				refreshAvailability = true;
				autoUpdate(refreshFlagResource);*/
			}
		}
	});
	var str = "<div id='extTable'><center><div class='tableCon'><div class='datagrid divTableDesign'>NEW TIME RESERVATION INFORMATION</div></div><br/><br/></center>";
		str += "<div class='tableCon'><div class='datagrid divTableDesign'><table border=1 style='width:100%'><tr><th>Iteration Number</th><th>Start Date</th><th>Start Time</th><th>End Date</th><th>End Time</th></tr>"

	for (var d = 0; d < globalIterArr.length; d++) {
		str += "<tr>";
		$('#ReservationReserve_'+globalDevArr[0]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	       	sdate = $(this).parent().parent().find('td').eq(8).find('input').val();
		    stime = $(this).parent().parent().find('td').eq(9).find('input').val();
   			edate = $(this).parent().parent().find('td').eq(17).find('input').val();
   			etime = $(this).parent().parent().find('td').eq(18).find('input').val();
		});
		str += "<td class='defaultGrid'>"+globalIterArr[d]+"</td>";	
		str += "<td class='defaultGrid' style='padding-left:10px;padding-right:10px'>"+sdate+"</td>";	
		str += "<td class='defaultGrid' style='padding-left:10px;padding-right:10px'>"+stime+"</td>";	
		str += "<td class='defaultGrid' style='padding-left:10px;padding-right:10px'>"+edate+"</td>";	
		str += "<td class='defaultGrid' style='padding-left:10px;padding-right:10px'>"+etime+"</td>";	
		str += "<tr/>";
	}
	str += "</table><br/><br/></div></div></div>";
	$('#Alert').empty().append(str).dialog("open");
	//refreshAvailability = true;
	//autoUpdate(refreshFlagResource);
	for (var d = 0; d < globalIterArr.length; d++) {
		var sd = origInfo[globalIterArr[d]].split("^")[0];
		var st = origInfo[globalIterArr[d]].split("^")[1];
		var inte = origInfo[globalIterArr[d]].split("^")[2];
		var ed = origInfo[globalIterArr[d]].split("^")[3];
		var et = origInfo[globalIterArr[d]].split("^")[4];
		for (var f = 0; f < globalDevArr.length; f++) {
			$('#ReservationReserve_'+globalDevArr[f]+'_'+resid+'[iter="'+globalIterArr[d]+'"]').each (function() {
	      		$(this).parent().parent().find('td').eq(8).find('input').val(sd);
				$(this).parent().parent().find('td').eq(9).find('input').val(st);
   				$(this).parent().parent().find('td').eq(17).find('input').val(ed);
	   			$(this).parent().parent().find('td').eq(18).find('input').val(et);
   				$(this).parent().parent().find('td').eq(13).find('input').val(inte);
			});
		}
	}
	var ind = 0;
	$(".ui-widget-overlay").each(function() {
		var zind = parseInt($(this).css("z-index"));
		if (zind > ind) {
			ind = zind;
		}
	});
	ind += 50;
    $('#Alert2').parent().css('z-index',ind);
	$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('OK')").button("disable");
	$('#Alert').parent().find(".ui-dialog-buttonpane button:contains('Cancel')").button("disable");
	$('#Alert2').height($('#extTable').height()+10);
	$('#Alert2').parent().width("auto");

}
function computeMeNow(edate,etime,diff){

	var sdayArr = edate.split("-");
    var syear = parseInt(sdayArr[0]);
    var smonth = parseInt(sdayArr[1]);
    var sday = parseInt(sdayArr[2]);
    var stimeArr = etime.split(":");
    var shour = parseInt(stimeArr[0]);
    var smin = parseInt(stimeArr[1]);
    var ssec = stimeArr[2];

    if (/^0/i.test(smonth) == true && smonth.length == 2) {
        smonth = smonth[1] - 1;
    } else {
        smonth = smonth-1;

      }
    if (/^0/i.test(sday) == true && sday.length == 2 ) {
        sday = sday[1];
    }
    if (/^0/i.test(shour) == true && shour.length == 2) {
        shour = shour[1];
    }
    if (/^0/i.test(smin) == true && smin.length == 2) {
        smin = smin[1];
    }

    var myDate=new Date(syear,smonth,sday,shour,smin,ssec);
    /*myDate.setDate(myDate.getDate()+parseInt(day));*/
    //var nhour = parseInt(hour)*60*60*1000;
    //var nmin = parseInt(min)*60*1000;
    if (diff != 0)
	    myDate.setTime(myDate.getTime()+diff);

    var nyear = myDate.getFullYear();
	var nmonth = myDate.getMonth()+1;
    var nday = myDate.getDate();
    nhour = myDate.getHours();
    nmin = myDate.getMinutes();
    if (nmonth < 10) {
        nmonth = "0" + nmonth;
    }
    if (nday < 10) {
        nday = "0" + nday;
    }
    if (nhour < 10) {
        nhour = "0" + nhour;
    }
    if (nmin < 10) {
        nmin = "0" + nmin;
    }
    var endDate = nyear+"-" + nmonth + "-" + nday;
    var endTime = nhour + ":" + nmin + ":" + ssec;

	var endinfo = new Array(endDate,endTime);

    return endinfo;

}
function updateCurrentExtension() {
    //var url='https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?action=updatecurrentextension&query=user='+globalUserName+'^resourceid='+globalResourceId;
    var url=getURL('R4')+'action=updatecurrentextension&query={"QUERY":[{"user":"'+globalUserName+'","resourceid":"'+globalResourceId+'"}]}';
    $.ajax({
		url: url,
        dataType: 'html',
        async: false,
        success:function(data) {
        }
    });

}

function emptyStartOfReservation() {

	globalLoadImagePrimary = {};
	globalLoadImageSecondary = {};
	globalLoadImageCustom = {};
	globalLoadConfigPrimary = {};
	globalLoadConfigSecondary = {};
	globalLoadConfigCustom = {};
	globalLoadImageDetailPrimary = {};
	globalLoadImageDetailSecondary = {};
	globalLoadImageDetailCustom = {};
	globalLoadConfigDetailPrimary = {};
	globalLoadConfigDetailSecondary = {};
	globalLoadConfigDetailCustom = {};
}
function emptyEndOfReservation() {

    globalSaveImagePrimary = {};
    globalSaveImageSecondary = {};
    globalSaveImageCustom = {};
    globalSaveConfigPrimary = {};
    globalSaveConfigSecondary = {};
    globalSaveConfigCustom = {};
    globalSaveImageDetailPrimary = {};
    globalSaveImageDetailSecondary = {};
    globalSaveImageDetailCustom = {};
    globalSaveConfigDetailPrimary = {};
    globalSaveConfigDetailSecondary = {};
    globalSaveConfigDetailCustom = {};
}

function converttoclient(startDate,startTime) {

    var newtime = "";

    var url1 = getURL('RM4')+'action=converttoclient&query={"QUERY":[{"startdate":"'+startDate+'","starttime":"'+startTime+'"}]}';

    $.ajax({
        url: url1,
        dataType: 'html',
        async: false,
        success: function(data) {
            newtime = $.trim(data);
        }
    });

    return newtime;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : gatherAutoDAdminInfo
 #  AUTHOR        : Cathyrine C. Bobis
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gather data for auto d from admin page
 #  PARAMETERS    : array
 #
 #######################################################################
*/
function gatherAutoDAdminInfo(data){
	var host = $('#hostname').val();
	var mip = $('#chassisIp').val();
	var conip = $('#chassisConIp').val();
	var conport = $('#chassisConPort').val();
	var dtype = $('#devicetype2 > option:selected').text();
	var manu = $('#devicetype > option:selected').text();
	var duser = $('#addusername').val();
	var dpass = $('#addpassword').val();
	var tdomain = $('#devdomainAutoD > option:selected').text();
	var tdomainid = $('#devdomainAutoD > option:selected').val();
	var toSrch = $('#autoDNumConAdmin').val();
	var ptype = $('#partdevtype > option:selected').text();
	var padd = $('#partipadd > option:selected').text();
	var pmanu = $('#partdevmanu').val();
	var pslots = "";
	$.each($('#partSlotInfoAutoDAdminTbody > tr'), function(index,object){
		var tmpslot = object.children[1].innerHTML;
		var tmpcnt = object.children[3].getAttribute('value');
		var tmpval =","+tmpslot+":";
		if(tmpcnt!=undefined){ tmpval+=tmpcnt; }
		if($("#"+(object.children[0].children[0].getAttribute('id'))).is(':checked')){
			pslots += tmpval;
		}
	});

	if((dtype=="Test Tool" || dtype=="L1 Switch" || 
		dtype=="L2 Switch") && (host==undefined || host =="")){
		alertUser("Please fill up all required fields.")
		return false;
	}
	if(mip=="" || dtype=="Select" || manu=="" || manu=="Select" ||
		dpass=="" || tdomain=="Select"){
		alertUser("Please fill up all required fields.")
		return false;
	}
	if(conip=="" || (conport=="" && (conip.toLowerCase()!="na" || conip.toLowerCase()!="n/a"))){
		alertUser("Please fill up all required fields.")
		return false;
	}
	if(host!=undefined){ data.HostName = host; }
	if(mip!=undefined) { data.ManagementIp = mip; }
	if(conip!=undefined && conip.toLowerCase()!="na" && conip.toLowerCase()!="n/a") {
		data.ConsoleIp = conip;
	}
	switch(dtype){
		case "L1 Switch":
			dtype = "Layer 1 Switch";
		break;
		case "L2 Switch":
			"Layer 2 Switch"
		break;
	}
	data.Type = dtype
	data.Manufacturer = manu;
	data.DeviceType = manu;
	data.Username = duser;
	data.Password = dpass;
	if(toSrch!=undefined){ data.TotalPortsToSearch = toSrch; }
	if(ptype!=undefined && ptype!="Select"){ data.PartnerType = ptype; }
	if(padd!=undefined && padd!="Select"){ data.PartnerIp = padd; }
	if(pmanu!=undefined){ data.PartnerManufacturer = pmanu; }
	data.PartnerSlotNumber = pslots;
	data.Domain = tdomain;
	data.DomainId = tdomainid;
	
	autoDDevData[0] = data
	return true;
}
function getTooltipInfo(row,column){
	var html='';
	if(globalPageRM == "ReservationReserve"){
		if(column == "HostName"){
			html += "<li><b>DeviceId:</b>"+row.DeviceId+"</li>";
			html += "<li><b>Management IP:</b>"+row.ManagementIp+"</li>";
			html += "<li><b>Console IP:</b>"+row.ConsoleIp+"</li>";
			html += "<li><b>Model:</b>"+row.Model+"</li>";
			html += "<li><b>Manufacturer:</b>"+row.Manufacturer+"</li>";
			html += "<li><b>Software Version:</b>"+row.SoftwarePackage+"</li>";
			html += "<li><b>Connectivity(L1/L2/Open/Direct Connect):</b>"+row.AvailablePorts+"</li>";
		}
		if(column == "User"){
			html += "<li><b>Full Name:</b>"+row.FirstName+" "+row.LastName+"</li>";	
			html += "<li><b>Business Phone Number:</b>"+row.BusinessPhoneNumber+"</li>";
			html += "<li><b>Mobile Number:</b>"+row.CellPhoneNumber+"</li>";
			html += "<li><b>E-mail Address:</b>"+row.Email+"</li>";
			html += "<li><b>Department:</b>"+row.Department+"</li>";	
		}
	}else if(globalPageRM == "ReservationDevices"){
		if(column == "HostName"){
		html += "<li><b>Device Id:</b>"+row.DeviceId+"</li>";
		html += "<li><b>Management IP:</b>"+row.ManagementIp+"</li>";
		html += "<li><b>Console IP:</b>"+row.ConsoleIp+"</li>";
		html += "<li><b>Model:</b>"+row.Model+"</li>";
		html += "<li><b>Manufacturer:</b>"+row.Manufacturer+"</li>";
		html += "<li><b>Software Version:</b></li>";
		html += "<li><b>Connectivity (L1/L2/Open):</b>"+row.availablePorts+"</li>";

		}else if(column == "Connectivity"){
			html += "<li><b>Number Of GigabitEthernet Ports:</b>"+row.GigabitEthernetCount+"</li>";
			html += "<li><b>Number Of POS Ports:</b>"+row.POSCount+"</li>";
		}
	}
	return html;
}
function setIteration(val){
	if(val == ""){
		alerts('Invalid Input');
	}

}

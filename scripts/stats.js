

/*
 *
 *  FUNCTION NAME : datePickerStat()
 *  AUTHOR        : Maureen Daelo
 *  DATE          : January 24, 2014
 *  MODIFIED BY   :  
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Date Picker for Statistics
 *  PARAMETERS    : none
 *
 */
function datePickerStat(){
	getUlDomains()
//	$("#ulDomain").attr();
	var pickerOpts = {
		dateFormat: $.datepicker.ATOM
	}
	$("#datePickerStat").datepicker(pickerOpts);
	$("#datePickerStat2").datepicker(pickerOpts);
}

/*
 *
 *  FUNCTION NAME : dateText()
 *  AUTHOR        : Maureen Daelo
 *  DATE          : January 27, 2014
 *  MODIFIED BY   :  
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Date on Date Picker textBox for Statistics
 *  PARAMETERS    : none
 *
 */
function dateText(){

	$("#dateText").empty().append(datePickerStat);
}






/*
 *
 *  FUNCTION NAME : statsView()
 *  AUTHOR        : Maureen Daelo
 *  DATE          : January 27, 2014
 *  MODIFIED BY   :  
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Change Date View 
 *  PARAMETERS    : none
 *
 */

function statsViewDate(globalStatsView){
	var date = '';	
//	var date =  "<input name='select-native-2' data-inline='true' id='datePickerStat' onfocus='this.blur();'>";
//	$("#statsView2").empty().append(date);
	var aa = datePickerStat();
//	console.log(aa+"qwert");
//	$("#statsView option:selected").val();
	
//	console.log("sdf");
//	var view = $("#statsView option:selected").html();
	if (globalStatsView == "Daily"){
		date = "<input name='select-native-2' data-inline='true' id='datePickerStat' onfocus='this.blur();'>"
console.log("wahaha");
	}else if (globalStatsView == "Weekly"){
		date = "<input name='select-native-2' type='text' placeholder='Date' data-inline='true' id='datePickerStat' onfocus='this.blur();'>"
	}else if (globalStatsView == "Monthly"){
		var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
		var yyyy = 2000;
		var yy = "<option value=\""+yyyy+"\">"+yyyy+"</option>";
		var mm = "";
		for(var x=0; x<20; x++){
			yyyy = yyyy + 1;
			yy += "<option value=\""+yyyy+"\">"+yyyy+"</option>";
			
		}
		for (var m=0; m<months.length; m++){
			
			mm += "<option value=\""+months[m]+"\">"+months[m]+"</option>";
		} 
		date = "<table><td><select name=\"select-native-2\" id=\"statsViewYear\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Year</option>"+yy+"</td><td><select name=\"select-native-2\" id=\"statsViewMonth\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Month</option>"+mm+"</td></table>";
		date = "<table><td><select name=\"select-native-2\" id=\"statsViewYear\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Year</option>"+yy+"</td><td><select name=\"select-native-2\" id=\"statsViewMonth\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Month</option>"+mm+"</td></table>";

	}else if (globalStatsView == "Quarterly"){
		var quarter = new Array("Jan - Mar","Apr - Jun","Jul - Sep","Oct - Dec");		

		var yyyy = 2000;
		var yy = "<option value=\""+yyyy+"\">"+yyyy+"</option>";
		var qq = "";
		for(var x=0; x<20; x++){
			yyyy = yyyy + 1;
			yy += "<option value=\""+yyyy+"\">"+yyyy+"</option>";
			
		}
		for (var q=0; q<quarter.length; q++){
			
			qq += "<option value=\""+quarter[q]+"\">"+quarter[q]+"</option>";
		} 
		date = "<td><select name=\"select-native-2\" id=\"statsViewYear\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Year</option>"+yy+"</td><td><select name=\"select-native-2\" id=\"statsViewQuarter\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Months</option>"+qq+"</td>";


	}else if (globalStatsView == "Annually"){
		console.log(globalStatsView);

		var yyyy = 2000;
		var yy = "<option value=\""+yyyy+"\">"+yyyy+"</option>";
		var qq = "";
		for(var x=0; x<20; x++){
			yyyy = yyyy + 1;
			yy += "<option value=\""+yyyy+"\">"+yyyy+"</option>";
			
		}
		date = "<td><select name=\"select-native-2\" id=\"statsViewYear\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Year</option>"+yy+"</td>";
	}else if (globalStatsView == "Custom"){

		date = "<td><input name='select-native-2' type='text' placeholder='Start Date' data-inline='true' id='datePickerStat' onfocus='this.blur();'></td><td><input name='select-native-2' type='text' placeholder='End Date' data-inline='true' id='datePickerStat2' onfocus='this.blur();'></td>"
	}
	
	//$("#ulUser input").last().addClass('last');
	setTimeout(function(){
		datePickerStat();
		initDateStat();

	},500);
	$("#statsView2").empty().append(date);
	$("#statsView2").listview("refresh"); 
	$("#datePickerStat").listview("refresh"); 
	$("#statsViewYear").listview("refresh"); 
	$("#statsViewMonth").listview("refresh"); 
	$("#datePickerStat2").listview("refresh"); 
	console.log(globalStatSelect+"   ."+globalViewStatSelect+"   ."+globalStatsViewNew+"  ."+globalStatsView+"   ."+globalDomainContent+"   ."+globalDate);
	$("#statisticsDomainPage").trigger("create");
}



function getUlDomains() {
    $.ajax({
        url: 'http://'+CURRENT_IP+'/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?action=getUlDomains',
        dataType: 'html',
        async: false,
        success: function(data) {
            var statArr = new Array();
            var domains = $.trim(data).split("*")[0].split(",");
//            var str = "<li style='cursor:pointer' did2='All' did='Any' id='DomainAny' onclick=\"TotalFinalStatsTable(this.id,'Domain');onSelectedStat(this.id);\"><a>All</a></li>";
			var str = "<option value='Any'></option>";
			var str = str+"<option value='Any'>All</option>";
		//	var str = '';
            for (var f = 0; f < domains.length; f++) {
                var ids = domains[f].split("^")[0];
                var domname = domains[f].split("^")[1];
                //str += "<option value='"+domname+"' did2='"+domname+"' id='"+ids+"' did='Domain"+ids+"'>"+domname+"</option>";
                str += "<option value='"+ids+"'>"+domname+"</option>";
            }
//			console.log(str);
            $('#ulDomain').empty().append(str);
            $("#ulDomain option").last().addClass('last');
			//console.log(str);
/*            str = "<li style='cursor:pointer' did2='All'  did='Any' id='UserAny' onclick=\"TotalFinalStatsTable(this.id,'User');onSelectedStat(this.id);\"><a>All</a></li>";
            for (var f = 0; f < domains.length; f++) {
                var ids = domains[f].split("^")[0];
                var domname = domains[f].split("^")[1];
                str += "<li style='cursor:pointer' did='"+ids+"' did2 ='"+domname+"' id='User"+ids+"' onclick=\"TotalFinalStatsTable(this.id,'User');onSelectedStat(this.id);\"><a>"+domname+"</a></li>";
            }
            $('#ulUser').empty().append(str);
            $("#ulUser li").last().addClass('last');
          if (currbrowser == "safari") {
                var mouseoverEvt = function(){
                    $(this).css("color","red");
                };
                var mouseleaveEvt = function(){
                    $(this).css("color","#39599C");
                };
                $( "#srtree li a " ).each(function(){
                    $(this).bind("mouseover",mouseoverEvt);
                    $(this).click(function() {
                        $("#srtree li a").css("text-decoration","none").css("color","#39599C");
						//  $(this).unbind("mouseleave",mouseleaveEvt).bind("mouseleave",mouseleaveEvt2).css("text-decoration","underline").css("color","#33BBFF");
						});
                    $(this).bind("mouseleave",mouseleaveEvt);
                });
            }
*/
   //         var str2 = "<li style='cursor:pointer' did2='All'  did='Any' id='ReservationAny' onclick=\"TotalFinalStatsTable(this.id,'Reservation');onSelectedStat(this.id);\"><a><img src='../styles/base/images/res.png' style='width:16px;' />Reservation</a></li>";
//            $('#ulReservation').empty().append(str2);
        }
    });
	//StatSelectTable(globalStatSelect,globalViewStatSelect);
//	console.log(globalStatSelect);
	initDateStat();
	$("#statisticsDomainPage").trigger("create");
}




/*
 *
 *  FUNCTION NAME : initDateStat
 *  AUTHOR        : James Turingan
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : Maureen Daelo
 *  REVISION DATE : January 30, 2014
 *  REVISION #    : 1
 *  DESCRIPTION   : initialize the date picker
 *  PARAMETERS    : 
 *
 */
function initDateStat(){
	var date = new Date();
	var dateToday = date.getFullYear()+'-'+2+'-'+date.getDate();
	var timeH = date.getHours();
	var timeM = date.getMinutes();
	var timeS = date.getSeconds();
	if(timeH == 0){
		timeH = '00';
	}
	if(timeM == 0){
		timeM = '00';
	}
	if(timeS == 0){
		timeD = '00';
	}
	var time = timeH+':'+timeM+':'+timeS;
	var ntime = convertTime(time);
	$('#datePickerStat').val(dateToday);
	if (globalStatsView == 'Daily'){
		globalDate = dateToday+','+dateToday;
	}
	changeComponents();
	//UserDeatiledTable();
}

/*
 *
 *  FUNCTION NAME : StatSelectTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : January 30, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize globalValue
 *  PARAMETERS    : 
 *
 */

function StatSelectTable(){
	//nDeviceDetailedTableTable();
//	statsViewDate()
//	$("#statSelect option:selected").val();
//	globalStatSelect = $("#statSelect option:selected").html();

//	$("#statsViewDate option:selected").val();
//	globalViewStatSelect = $("#statsViewDate option:selected").html();

	console.log(globalStatSelect+"   ."+globalViewStatSelect+"   ."+globalStatsViewNew+"  ."+globalStatsView+"   ."+globalDomainContent+"   ."+globalDate);
//	console.log(globalViewStatSelect+"dalawa");
//	globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate


}


/*
 #######################################################################
 #
 #  FUNCTION NAME : changeComponents
 #  AUTHOR        : Maureen Daelo
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : January 31, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : slection in statistics domain page
 #  PARAMETERS    : globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate
 #
 #######################################################################
*/

function changeComponents(){
//	StatSelectTable(globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate);
//	$('#domain-table0').removeAttr('style');
//	$('#domain-table0-popup').removeAttr('style');
//	consp0ole.log($('#domain-table0-popup').removeAttr('style'));
	globalStatLimit = 20;
    $("#ShowGraph").hide();
	

	if (globalStatSelect == 'Device'){
		if (globalViewStatSelect == 'Detailed'){
			DeviceDetailedTable();					
			action = 'devicedetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			DeviceSummaryTable();
			action = 'modelstatsgraphtest';
		}
	}else if (globalStatSelect == 'Slot'){
		if (globalViewStatSelect == 'Detailed'){
			SlotDetailedTable();
			action = 'slotdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			SlotSummaryTable();
			action = 'slotstatsgraphtest';
		}
	}else if (globalStatSelect == 'Module'){
 	if (globalViewStatSelect == 'Detailed'){
			ModuleDetailedTable();
			action = 'moduledetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			ModuleSummaryTable();
			action = 'modulestatsgraphtest';
		}
	}else if (globalStatSelect == 'Port'){
		if (globalViewStatSelect == 'Detailed'){
			PortDetailedTable();
			action = 'portdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			PortSummaryTable();
			action = 'portstatsgraphtest';
		}

	}
//	var checkId2 = highLightId();
//	createGraph(action, checkId2);
//	$('#domain-table0').attr('style','display:all');
//	$('#domain-table0-popup').attr('style','display:all');
	
	//$("#statisticsDomainPage").trigger("create");
}


/*
 *
 *  FUNCTION NAME : DeviceDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 1, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize DeviceTable in detailed view
 *  PARAMETERS    : 
 *
 */

function DeviceDetailedTable(){

//    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query='+globalDate+"&domain="+globalDomainContent+'&limit=100&page=1&user='+globalUserName;//+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
	var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedview&id=&limit='+globalStatLimit+'&page='+globalStatPage+'&view=Day&date='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;
	
	console.log(url);
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
		data = '{  "root": {  "row": [ {  "Connectivity": "4/0/3", "HostName": "R8_R5", "Util": "0 hr 0.00 min", "Idle": "24 hrs 0.00 min", "PercentIdle": "100.00",  "PercentUtil": "0.00", "Pass": "0", "Fail": "0", "NumberOfCancellation": "0", "PercentPass": "0.00", "PercentFail": "0.00", "PercentCancel": "0.00", "Generic": "0", "Explicit": "0", "PercentGeneric": "0.00", "PercentExplicit": "0.00", "GenericFailed": "0", "ExplicitFailed": "0", "PercentGenericFailed": "0.00", "PercentExplicitFailed": "0.00", "DateAdded": "20140202 20:19:12", "SerialNumber": "SSI15100BYJ", "OSType": "IOSXE", "Model": "ASR1001", "ManagementIp": "1.18.8.5", "SoftwarePackage": "(X86_64_LINUX_IOSDUNIVERSALK9M)", "OSVersion": "15.3(2)S1", "DeviceId": "12006", "DeviceType": "Dut", "SystemMemory": "1133939K/6147K bytes", "Manufacturer": "Cisco", "ConsoleIp":"172.27.41.160:2007" }, { "Connectivity": "6/0/10", "HostName": "MAvalanche192", "Util": "0 hr 0.00 min", "Idle": "24 hrs 0.00 min", "PercentIdle": "100.00", "PercentUtil": "0.00", "Pass": "0", "Fail": "0", "NumberOfCancellation": "0", "PercentPass": "0.00", "PercentFail": "0.00", "PercentCancel": "0.00", "Generic": "0", "Explicit": "0", "PercentGeneric": "0.00", "PercentExplicit": "0.00", "GenericFailed": "0", "ExplicitFailed": "0", "PercentGenericFailed": "0.00", "PercentExplicitFailed": "0.00", "DateAdded": "20140203 19:17:17", "OSType": "N/A", "Model": "Avalanche", "ManagementIp": "172.27.63.192", "DeviceId": "12015", "DeviceType": "TestTool", "Manufacturer": "Spirent" }, { "Connectivity": "8/0/11", "HostName": "R5_R7", "Util": "0 hr 0.00 min", "Idle": "24 hrs 0.00 min", "PercentIdle": "100.00", "PercentUtil": "0.00", "Pass": "0", "Fail": "0", "NumberOfCancellation": "0", "PercentPass": "0.00", "PercentFail": "0.00", "PercentCancel": "0.00", "Generic": "0", "Explicit": "0", "PercentGeneric": "0.00", "PercentExplicit": "0.00", "GenericFailed": "0", "ExplicitFailed": "0", "PercentGenericFailed": "0.00", "PercentExplicitFailed": "0.00", "DateAdded": "2014020220:19:12", "SerialNumber": "UNKNOWN", "OSType": "IOSXE", "Model": "ASR1006", "ManagementIp": "1.18.5.7", "SoftwarePackage": "(X86_64_LINUX_IOSDADVENTERPRISEK9M)", "OSVersion": "15.3(20130519:003101)", "DeviceId": "12018", "DeviceType": "Dut", "SystemMemory": "4197119K/6147K bytes", "Manufacturer": "Cisco", "ConsoleIp": "172.27.40.45:2015" } ], "total": "292", "pages": "15", "page": "1" } }';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			var filter = "<option value='DeviceId'></option>";
			filter = filter+"<option value='DeviceId'>ID</option>";
			filter = filter+"<option value='HostName'>HostName</option>";
			filter = filter+"<option value='ManagementIp'>MgmtIP</option>";
			filter = filter+"<option value='ConsoleIP'>Console IP</option>";
			filter = filter+"<option value='Manufacturer'>Manufacturer</option>";
			filter = filter+"<option value='Model'>Model</option>";
			filter = filter+"<option value='DeviceType'>Model</option>";
			html = DeviceDetailedTableContent(jsonData,html);
			html = html+"</tbody>";
//			console.log(deviceD);
			$("#filterStat").empty().append(filter);            
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").empty().append(html);            
			$("#domain-table0 tbody").last().addClass('last');
			$("#domain-table0").table( "refresh" );
				
			var ctr;
			ctr = 0;	
			var val = '';
			var globalStatisticsId = [];
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
				   	$('#ShowGraph').show();
					val = $(this).attr('id');
//					groupHighlight(val);	
					globalStatisticsId.push(val);
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val2 = $(this).attr('id');
//					groupRemoveHighlight(val);	
					console.log(globalStatisticsId.length,'vkgkgkglblbfbgln;bnbmbvmgvmkgbjf');
					if (globalStatisticsId.length > 1){
						for(var b=0; b<globalStatisticsId.length; b++){
							 if (globalStatisticsId[b] == val2){
								delete globalStatisticsId[b];
							}
						}
					}
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
					$('#ShowGraph').hide();
				}	
			});
			filterStatDomain();
		}
	});
	

	//var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedview&id=&limit=10000&page=1&view='+fview+'&date='+golbalDate+'&domain='+domain+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
	
			//console.log(globalStatisticsId.length,'square root of negative one 2.0');
	
	$("#statisticsDomainPage").trigger("create");
}
			
/*            var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			console.log(pages);
			StatSelectLimit(pages);
			console.log("root===============");
			$("#totalMatchesDomain").empty().append(total);            
			var deviceD = "<thead id=rmResStat><tr class='ui-bar-d'>";
			deviceD = deviceD+"<th>ID</th><th>Date Added</th>";
			deviceD = deviceD+"<th data-priority='2'>HostName</th>";
			deviceD = deviceD+"<th data-priority='6'>MgmtIP</th>";
			deviceD = deviceD+"<th data-priority='6'>Console IP</th>";
			deviceD = deviceD+"<th data-priority='6'>Manufacturer</th>";
			deviceD = deviceD+"<th data-priority='2'>Model</th>";
			deviceD = deviceD+"<th data-priority='6'>Device Type</th>";
			var filter = "<option value='DeviceId'></option>";
			filter = filter+"<option value='DeviceId'>ID</option>";
			filter = filter+"<option value='HostName'>HostName</option>";
			filter = filter+"<option value='ManagementIp'>MgmtIP</option>";
			filter = filter+"<option value='ConsoleIP'>Console IP</option>";
			filter = filter+"<option value='Manufacturer'>Manufacturer</option>";
			filter = filter+"<option value='Model'>Model</option>";
			filter = filter+"<option value='DeviceType'>Model</option>";
			if (globalStatsViewNew == 'Utilization'){
				deviceD = deviceD+"<th data-priority='2'>Idle(Hrs/Mins)</th>";
				deviceD = deviceD+"<th data-priority='2'>Reservation</th>";
				deviceD = deviceD+"<th data-priority='2'>Idle(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Reservation (%)</th>";
			}else if(globalStatsViewNew == 'Reservation'){
				deviceD = deviceD+"<th data-priority='2'>Scheduled</th>";
				deviceD = deviceD+"<th data-priority='2'>Generic</th>";
				deviceD = deviceD+"<th data-priority='2'>Explicit</th>";
				deviceD = deviceD+"<th data-priority='2'>Re-Scheduled</th>";
				deviceD = deviceD+"<th data-priority='2'>Generic</th>";
				deviceD = deviceD+"<th data-priority='2'>Explicit</th>";
				deviceD = deviceD+"<th data-priority='2'>Cancelled</th>";
				deviceD = deviceD+"<th data-priority='2'>Scheduled(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Generic(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Explicit(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Re-Scheduled(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Generic(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Explicit(%)</th>";
				deviceD = deviceD+"<th data-priority='2'>Cancelled(%)</th>";

			}
			deviceD = deviceD+"<th data-priority='6'>OS Version</th>";
			deviceD = deviceD+"<th data-priority='6'>System Memory</th>";
			deviceD = deviceD+"</tr></thead><tbody id='tbodyDevice'><tr>";

			for (a=0; a< row.length; a++){
				
				deviceD += "<tr class='trStat' id='"+row[a].getAttribute('DeviceId')+"'>";
				deviceD += "<td>"+row[a].getAttribute('DeviceId')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('DateAdded')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('HostName')+"</td>";
				var ManagementIp = row[a].getAttribute('ManagementIp');
					if (ManagementIp == ''){
						ManagementIp = 'N/A';
					}
				deviceD += "<td>"+row[a].getAttribute('ManagementIp')+"</td>";
				 var ConsoleIp = row[a].getAttribute('ConsoleIp');
				if (ConsoleIp == ''){
					ConsoleIp = 'N/A';
				}			
				deviceD += "<td>"+ConsoleIp+"</td>";
				deviceD += "<td>"+row[a].getAttribute('Manufacturer')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('Model')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('DeviceType')+"</td>";
				if (globalStatsViewNew == 'Utilization'){
					deviceD += "<td>"+row[a].getAttribute('Idle')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Util')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentIdle')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentUtil')+"</td>";
				}else if(globalStatsViewNew == 'Reservation'){
					deviceD += "<td>"+row[a].getAttribute('Pass')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Generic')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Fail')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('NumberOfCancellation')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentPass')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentGeneric')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentExplicit')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentFail')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentGenericFailed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentExplicitFailed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('PercentCancel')+"</td>";

				}
				var OSVersion = row[a].getAttribute('OSVersion');
				if (OSVersion == ''){
					OSVersion = 'N/A';
				}

				deviceD += "<td>"+OSVersion+"</td>";
				var SystemMemory = row[a].getAttribute('SystemMemory')
				if (SystemMemory == ''){
					SystemMemory = 'N/A';
				}
				deviceD += "<td>"+SystemMemory+"</td>";
				deviceD += "</tr>";
			}
			deviceD = deviceD+"</tbody>";
//			console.log(deviceD);
			$("#filterStat").empty().append(filter);            
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").empty().append(deviceD);            
			$("#domain-table0 tbody").last().addClass('last');
			$("#domain-table0").table( "refresh" );
				
			var ctr;
			ctr = 0;	
			var val = '';
			var globalStatisticsId = [];
			$(".trStat").on("tap",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
				   	$('#ShowGraph').show();
					val = $(this).attr('id');
//					groupHighlight(val);	
					globalStatisticsId.push(val);
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val2 = $(this).attr('id');
//					groupRemoveHighlight(val);	
					console.log(globalStatisticsId.length,'vkgkgkglblbfbgln;bnbmbvmgvmkgbjf');
					if (globalStatisticsId.length > 1){
						for(var b=0; b<globalStatisticsId.length; b++){
							 if (globalStatisticsId[b] == val2){
								delete globalStatisticsId[b];

							}
						}
					}
//					globalStatisticsId.pop(val);
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
					$('#ShowGraph').hide();
				}	
//			console.log(val,'square root of negative one 2.00');
//			console.log(this,'square root of negative 2.0');
//			console.log(globalStatisticsId,'square root of one');
			});
			filterStatDomain();
		}
	});
	

	//var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedview&id=&limit=10000&page=1&view='+fview+'&date='+golbalDate+'&domain='+domain+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
	
			//console.log(globalStatisticsId.length,'square root of negative one 2.0');
	
}
*/
function changeComponent(num){
	console.log(num+"==========");
	for(var i = 0; i < 8; i++){
		if(i == num){
		console.log(i!=num,num);
			$('#domain-table'+i).removeAttr('style');
			$('#domain-table'+i+'-popup').removeAttr('style','display:none');
		}else{
			$('#domain-table'+i).attr('style','display:none');
			$('#domain-table'+i+'-popup').attr('style','display:none');
		}
	}
}


/*	switch (val){
		case "0": // shows devices
			$('#domainDevices-table')	
		break;
		case "1":
	
		break;
	}
*/

/*
 *
 *  FUNCTION NAME : StatSelectLimit
 *  AUTHOR        : Maureen Daelo
 *  DATE          : January 30, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : gives the list of pages
 *  PARAMETERS    : 
 *
 */

function StatSelectLimit(pages){
	var  page = '';
	for (a=1; a<pages; a++){
		a = a;
		page += '<option value='+a+'>'+a+'</option>';
	}
	page = page+'<option value='+pages+'>'+pages+'</option>';
 $("#statPage").empty().append(page);

}


/*
 *
 *  FUNCTION NAME : DeviceSummaryTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize DeviceTable in summary
 *  PARAMETERS    : 
 *
 */

function DeviceSummaryTable(){
//https://172.24.1.11/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query=2014-02-03,2014-02-03&domain=Any&limit=20&page=1&sort=&orderby=&user=mdaelo&filter=&terminal=no&switch=no

	if (globalStatsView == 'Daily'){
		globalDate = globalDate+","+globalDate;
	}

    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query='+globalDate+"&domain="+globalDomainContent+'&limit='+globalStatLimit+'&page=1&user='+globalUserName+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
//	var url = https://172.24.1.11/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query=2014-02-03,2014-02-03&domain=Any&limit=20&page=1&sort=&orderby=&user=mdaelo&filter=&terminal=no&switch=no
	
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": { "row":[{"Name": "ASR1001","Name2": "ASR1001","Manufacturer": "Cisco","UserType": "Administrator","NumberOfDevices":"24","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "576 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation":"2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "ASR1006","Name2": "ASR1006","Manufacturer": "Cisco","UserType": "Administrator","NumberOfDevices": "23","AverageUtilization": "0.03","AverageDuration": "0 hr 0.50 min","AverageIdle": "23 hrs 59.50 mins","AveragePercentIdle": "99.97","TotalUtilization": "0 hr 11.40 mins","TotalIdle": "551 hrs 48.60 mins","TotalPercentUtilization": "0.03","TotalPercentIdle": "99.97","ActualStartReservation": "2014-2-18","ActualEndReservation":"2014-2-18","PassCount": "12","Failed": "0","Cancelled": "0","Generic": "9","Explicit": "3","GenericFailed": "0","ExplicitFailed": "0","PercentGeneric": "75.00","PercentExplicit": "25.00","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","PassPercent": "100.00","FailedPercent": "0.00","CancelPercent": "0.00"},{"Name": "ASR1004","Name2": "ASR1004","Manufacturer": "Cisco","UserType": "Administrator","NumberOfDevices": "16","AverageUtilization":"0.16","AverageDuration": "0 hr 2.24 mins","AverageIdle": "23 hrs 57.76 mins","AveragePercentIdle": "99.84","TotalUtilization": "0 hr 35.85mins","TotalIdle": "383 hrs 24.15 mins","TotalPercentUtilization": "0.16","TotalPercentIdle": "99.84","ActualStartReservation": "2014-2-18","ActualEndReservation":"2014-2-18","PassCount": "1","Failed": "0","Cancelled": "0","Generic": "1","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0","PercentGeneric": "100.00","PercentExplicit": "0.00","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","PassPercent": "100.00","FailedPercent": "0.00","CancelPercent": "0.00"}], "total": "56","pages": "3","page": "1"}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			
			html = html+"<th data-priority='1'>Model</th>";
			html = html+"<th  data-priority='1'>Number Of Devices</th>";
			html = html+"<th  data-priority='1'>Manaufacturer</th>";
			
			var filter = "<option value=Model></option>";
			filter = filter+"<option value=Model>Model</option>";
			filter = filter+"<option value=Manaufacturer>Manaufacturer</option>";
			html = TableHeader(html);
			html = DeviceSummaryTableContent(jsonData,html);


			html = html+"</tbody>";
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();
		}
	});
}

/*
 *
 *  FUNCTION NAME : SlotDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize SlotTable in detailed view
 *  PARAMETERS    : 
 *
 */
function SlotDetailedTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=slotdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"row": [{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel":"0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","SerialNumber": "SSI161706V4","OSType": "IOS-XE","Model": "ASR1001","ManagementIp": "1.18.8.4","Number": "0","SoftwarePackage": "(X86_64_LINUX_IOSD-UNIVERSALK9-M)","OSVersion": "15.3(2)S1","DeviceId": "11984","Manufacturer":"Cisco","SlotId": "1968","Description": " Cisco ASR1001 SPA Interface Processor ","ProductIdentifier": "ASR1001-4X1GE","ConsoleIp":"172.27.41.160:2006"},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","SerialNumber": "SSI161706V4","OSType": "IOS-XE","Model": "ASR1001","ManagementIp": "1.18.8.4","Number": "R0","SoftwarePackage": "(X86_64_LINUX_IOSD-UNIVERSALK9-M)","OSVersion": "15.3(2)S1","DeviceId": "11984","Manufacturer": "Cisco","SlotId": "1971","Description": "Module R0 Route Processor","ProductIdentifier": "ASR1001-4X1GE","ConsoleIp": "172.27.41.160:2006"},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","SerialNumber":"SSI161706V4","OSType": "IOS-XE","Model": "ASR1001","ManagementIp": "1.18.8.4","Number": "F0","SoftwarePackage":"(X86_64_LINUX_IOSD-UNIVERSALK9-M)","OSVersion": "15.3(2)S1","DeviceId": "11984","Manufacturer": "Cisco","SlotId": "1972","Description": "ModuleF0 Embedded Processor","ProductIdentifier": "ASR1001-4X1GE","ConsoleIp": "172.27.41.160:2006"}], "total": "738","pages": "37","page": "1"}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			html = html+"<th data-priority='1'>DeviceID</th>";
			html = html+"<th data-priority='1'>Date Added</th>";
			html = html+"<th data-priority='1'>HostName</th>";
			html = html+"<th data-priority='1'>Number</th>";
			html = html+"<th data-priority='1'>ProductIdentifier</th>";
			html = html+"<th data-priority='1'>Description</th>";
			var filter = "<option value=DeviceID></option>";
			filter = filter+"<option value=DeviceID>DeviceID</option>";
			filter = filter+"<option value=HostName>HostName</option>";
			filter = filter+"<option value=Number>Number</option>";
			filter = filter+"<option value=ProductIdentifier>ProductIdentifier</option>";
			filter = filter+"<option value=Description>Description</option>";
			html = TableHeader(html);	
			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = SlotDetailedTableContent(jsonData,html);

			html = html+"</tbody>";
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();
		}
	});
}



/*
 *
 *  FUNCTION NAME : SlotSummaryTablee
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize SlotTable in Summary
 *  PARAMETERS    : 
 *
 */

function SlotSummaryTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=esprpstats&query='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page=1';
//&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"row": [{"Name": "ASR1001-4X1GE","Name2": "ASR10014X1GE","NumberOfSlots": "6","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "144 hrs 0.00min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "UCS-E160DP-M1/K9","Name2": "UCSE160DPM1K9","NumberOfSlots": "2","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "48 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation":"2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "ASR1000-ESP5","Name2": "ASR1000ESP5","NumberOfSlots": "3","AverageUtilization": "0.00","AverageDuration": "0hr0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "72 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed":"0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"}], "total": "71","pages": "4","page": "1"}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			
			var filter = "<option value=ProductIdentifier></option>";
			filter = filter+"<option value=ProductIdentifier>Product Identifier</option>";
			html = html+"<th>Product Identifier</th>";
			html = html+"<th>Number of Cards</th>";
			html = TableHeader(html);

			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = SlotSummaryTableContent(jsonData,html);
			html = html+"</tbody>";
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();

		}
	});
}

/*
 *
 *  FUNCTION NAME : ModuleDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize ModuleTable in detailed view
 *  PARAMETERS    : 
 *
 */

function ModuleDetailedTable(){


	var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=moduledetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+'&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal;


	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "297","pages": "15","page": "1","row": [{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel":"0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","SlotNo": "0","Model": "ASR1001","SoftwarePackage":"(X86_64_LINUX_IOSD-UNIVERSALK9-M)","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber":"SSI161706V4","SlotProductIdentifier": "ASR1001-4X1GE","OSType": "IOS-XE","ModuleNo": "0","ModuleProductIdentifier": "ASR1001","ManagementIp": "1.18.8.4","OSVersion": "15.3(2)S1","ModuleId": "618","Description": " 4-port Gigabit Ethernet Shared Port Adapter "},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-0220:19:11","SlotNo": "0","Model": "ASR1001","SoftwarePackage": "(X86_64_LINUX_IOSD-UNIVERSALK9-M)","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp":"172.27.41.160:2006","SerialNumber": "SSI161706V4","SlotProductIdentifier": "ASR1001-4X1GE","OSType": "IOS-XE","ModuleNo": "2","ModuleProductIdentifier": "ASR1001-IDC-4XGE","ManagementIp": "1.18.8.4","OSVersion": "15.3(2)S1","ModuleId": "619","Description": " 4-port Gigabit EthernetIntegrated Daughter Card "},{"Connectivity": "4/0/4","HostName": "R5_R1","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-01-28 22:52:09","SlotNo": "0","Model": "ASR1006","SoftwarePackage": "(X86_64_LINUX_IOSD-ADVENTERPRISEK9-M)","DeviceId": "11992","Manufacturer": "Cisco","ConsoleIp": "172.27.40.45:2003","SerialNumber": "FOX1537GF7Q","SlotProductIdentifier": "ASR1000-SIP10","OSType": "IOS-XE","ModuleNo": "0","ModuleProductIdentifier": "SPA-5X1GE-V2","ManagementIp": "1.18.5.1","OSVersion": "15.3(20130208:132151)","ModuleId": "623","Description": " 5-port Gigabit Ethernet Shared Port Adapter "}]}}';
			$("#totalMatchesDomain").empty().append(total);            
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			html = html+"<th>ID</th>";
			html = html+"<th>Date Added</th>";
			html = html+"<th>HostName</th>";
			html = html+"<th>Slot Number</th>";
			html = html+"<th>Slot Product Id</th>";
			html = html+"<th>Module Number</th>";
			html = html+"<th>Module Description</th>";
			var filter = "<option value=DeviceId></option>";
			filter = filter+"<option value=DeviceId>ID</option>";
			filter = filter+"<option value=HostName>HostName</option>";
			filter = filter+"<option value=SlotNumber>SlotNumber</option>";
			filter = filter+"<option value=SlotProductId>SlotProductId</option>";
			filter = filter+"<option value=ModuleNumber>ModuleNumber</option>";
			filter = filter+"<option value=ModuleProductId>ModuleProductId</option>";
			filter = filter+"<option value=ModuleDescription>ModuleDescription</option>";
			html = TableHeader(html);
			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = ModuleDetailedTableContent(jsonData,html);
				
			html = html+"</tbody>";
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();
		}
	});

}


/*
 *
 *  FUNCTION NAME : ModuleSummaryTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize ModuleTable in summary view
 *  PARAMETERS    : 
 *
 */

function ModuleSummaryTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modulestats&query='+globalDate+"&domain="+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page='+globalStatPage;//&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "23","pages": "2","page": "1","row": [{"Name": "ASR1001","Name2": "ASR1001","NumberOfModules": "18","AverageUtilization": "0.00","AverageDuration":"0hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "432 hrs 0.00min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "ASR1001-IDC-4XGE","Name2": "ASR1001IDC4XGE","NumberOfModules": "2","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "48 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation":"2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "SPA-5X1GE-V2","Name2": "SPA5X1GEV2","NumberOfModules": "13","AverageUtilization": "0.00","AverageDuration": "0hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "312 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed":"0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			html = html+"<th>Product Identifier</th>";
			html = html+"<th>Number of Modules</th>";
			var filter = "<option value=ProductIdentifier></option>";
			filter = filter+"<option value=ProductIdentifier>Product Identifier</option>";
			html = TableHeader(html);
			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = ModuleSummaryTableContent(jsonData,html);
			html = html+"</tbody>";
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();
		}
	});
}



/*
 *
 *  FUNCTION NAME : PortDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize PortTable in detailed view
 *  PARAMETERS    : 
 *
 */

function PortDetailedTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=portdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"row": [{"PartnerDevice": "MRV-12","Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","ModuleDescription": " 4-port Gigabit Ethernet Integrated DaughterCard ","PortDescription": "Hardware is ASR1001-IDC-4XGE","PortName": "GigabitEthernet0/2/1","Model": "ASR1001","SoftwarePackage":"(X86_64_LINUX_IOSD-UNIVERSALK9-M)","Speed": "1000","SlotProductId": "ASR1001-4X1GE","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber": "SSI161706V4","ModuleNumber": "2","MediaType": "unknown media type ","OSType": "IOS-XE","PortId": "9678","SlotNumber": "0","ManagementIp": "1.18.8.4","ModuleProductId": "ASR1001-IDC-4XGE","OSVersion": "15.3(2)S1","PortNumber": "1"},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-0220:19:11","ModuleDescription": " 4-port Gigabit Ethernet Integrated Daughter Card ","PortDescription": "Hardware is ASR1001-IDC-4XGE","PortName":"GigabitEthernet0/2/2","Model": "ASR1001","SoftwarePackage": "(X86_64_LINUX_IOSD-UNIVERSALK9-M)","Speed": "1000","SlotProductId":"ASR1001-4X1GE","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber": "SSI161706V4","ModuleNumber": "2","MediaType": "unknown media type ","OSType": "IOS-XE","PortId": "9679","SlotNumber": "0","ManagementIp": "1.18.8.4","ModuleProductId": "ASR1001-IDC-4XGE","OSVersion": "15.3(2)S1","PortNumber": "2"},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel":"0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","ModuleDescription": " 4-port Gigabit Ethernet Integrated DaughterCard ","PortDescription": "Hardware is ASR1001-IDC-4XGE","PortName": "GigabitEthernet0/2/3","Model": "ASR1001","SoftwarePackage":"(X86_64_LINUX_IOSD-UNIVERSALK9-M)","Speed": "1000","SlotProductId": "ASR1001-4X1GE","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber": "SSI161706V4","ModuleNumber": "2","MediaType": "unknown media type ","OSType": "IOS-XE","PortId": "9680","SlotNumber": "0","ManagementIp": "1.18.8.4","ModuleProductId": "ASR1001-IDC-4XGE","OSVersion": "15.3(2)S1","PortNumber": "3"}], "total": "2684","pages": "135","page": "1"}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			html = html+"<th data-priority='1'>ID</th>";
			html = html+"<th data-priority='1'>Date Added</th>";
			html = html+"<th data-priority='1'>HostName</th>";
			html = html+"<th data-priority='1'>Slot Number</th>";
			html = html+"<th data-priority='1'>Slot Product Id</th>";
			html = html+"<th data-priority='1'>Module Number</th>";
			html = html+"<th data-priority='1'>Module Product Id</th>";
			html = html+"<th data-priority='1'>PortName</th>";
			html = html+"<th data-priority='1'>Port Number</th>";
			html = html+"<th data-priority='1'>Media Type</th>";
			html = html+"<th data-priority='1'>Speed</th>";
			html = html+"<th data-priority='1'>Port Description</th>";
			html = html+"<th data-priority='1'>Partner Device</th>";
		
			var filter = "<option value=HostName></option>";
			filter = filter+"<option value=HostName>HostName</option>";
			filter = filter+"<option value=SlotNumber>Slot Number</option>";
			filter = filter+"<option value=SlotProduct>Slot Product</option>";
			filter = filter+"<option value=ModuleNumber>Module Number</option>";
			filter = filter+"<option value=ModuleProductId>Module Product Id</option>";
			filter = filter+"<option value=PortName>PortName</option>";
			filter = filter+"<option value=PortNumber>Port Number</option>";
			filter = filter+"<option value=MediaType>Media Type</option>";
			filter = filter+"<option value=Speed>Speed</option>";
			filter = filter+"<option value=PortDescription>PortDescription</option>";
			html = TableHeader(html);

			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = PortDetailedTableContent(jsonData,html);
			html = html+"</tbody>";
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();
		}
	});
}


/*
 *
 *  FUNCTION NAME : PortSummaryTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize PortTable in summary view
 *  PARAMETERS    : 
 *
 */

function PortSummaryTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=portstats&query='+globalDate+"&domain="+globalDomainContent+'&domain='+globalDomainContent+'&page=1&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "74","pages": "4","page": "1","row": [{"Name": "Hardware is ASR1001","Name2": "HardwareisASR1001","NumberOfPorts": "72","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "1728 hrs0.00min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "Hardware is ASR1001-IDC-4XGE","Name2":"HardwareisASR1001IDC4XGE","NumberOfPorts": "8","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "192 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle":"100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic":"0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "Hardware is SPA-5X1GE-V2","Name2": "HardwareisSPA5X1GEV2","NumberOfPorts": "85","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "2040 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation":"2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			$("#totalMatchesDomain").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			html = html+"<th>Description</th>";
			html = html+"<th>Number of Ports</th>";
			var filter = "<option value=Description></option>";
			filter = filter+"<option value=Description>Description</option>";
			html = TableHeader(html);
			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = PortSummaryTableContent(jsonData,html);
			html = html+"</tbody>";
			$("#domain-table0").empty().append(html);
			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat tbody").last().addClass('last');
			$("#domain-table0").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('id');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('id');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
			filterStatDomain();
		}
	});
}



/*
 #######################################################################
 #
 #  FUNCTION NAME : changeComponentsUser
 #  AUTHOR        : Maureen Daelo
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : February 4, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : slection in statistics user page
 #  PARAMETERS    : globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate
 #
 #######################################################################
*/

function changeComponentsUser(){
	//StatSelectTable(globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate);
	globalStatLimit = 20;
	if (globalViewStatSelect == 'Detailed'){
		$("#StatsViewNewUser").empty();
		UserDeatiledTable();
	}else if (globalViewStatSelect == 'Summary'){
		var selects = "<select name='select-native-2' id='statsViewNew2' data-inline='true'>";
		selects = selects+"<option value='Utilization'>Utilization</option>";
		selects = selects+"<option value='Reservation'>Reservation</option></select>";
		$("#StatsViewNewUser").empty().append(selects);
		$("#StatsViewNewUser select").last().addClass('last');
		UserSummaryTable()
		console.log(selects);
	}
	$("#statisticsUserPage").trigger("create");
}

/*
 *
 *  FUNCTION NAME : UserDeatiledTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 4, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize UserDeatiledTable 
 *  PARAMETERS    : 
 *
 */

function UserDeatiledTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=userdetailedview&limit='+globalStatLimit+'&page=1&view=Day&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby+'&user='+globalUser+"&terminal="+terminal+"&switch="+switch1;

	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "132","pages": "7","page": "1","row": [{"Id": "594797","Status": "Reserved","LastName": "Mabignay","FirstName": "Kara","MiddleName": "Tan","UserName": "kmmabignay","UserType": "Administrator","Start": "2014-02-18 10:39:49","End": "2014-02-18 12:39:49","Duration": "2 hrs 0.00 min","Domain":"Guaranteed/Expensive/Security/BxB_Domain/TwinPeaks","GroupName": "Default"},{"Id": "594795","Status": "Reserved","LastName": "Mabignay","FirstName":"Kara","MiddleName": "Tan","UserName": "kmmabignay","UserType": "Administrator","Start": "2014-02-18 10:38:16","End": "2014-02-18 12:38:16","Duration": "2 hrs 0.00 min","Domain": "Guaranteed/Expensive/Security/BxB_Domain/TwinPeaks","GroupName": "Default"},{"Id": "594793","Status": "Reserved","LastName": "Mabignay","FirstName": "Kara","MiddleName": "Tan","UserName": "kmmabignay","UserType": "Administrator","Start": "2014-02-18 10:37:19","End":"2014-02-18 12:37:19","Duration": "2 hrs 0.00 min","Domain": "Guaranteed/Expensive/Security/BxB_Domain/TwinPeaks","GroupName": "Default"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			$("#totalMatchesUser").empty().append(total);            
			var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
	
			html = html+"<th>UserName</th>";
			html = html+"<th>LastName</th>";
			html = html+"<th>FirstName</th>";
			html = html+"<th>MiddleName</th>";
			html = html+"<th>UserType</th>";
			html = html+"<th>GroupName</th>";
			html = html+"<th>Domain</th>";

			var filter = "<option value='UserName'>UserName</option>";
			filter = filter+"<option value='LastName'>LastName</option>";	
			filter = filter+"<option value='FirstName'>FirstName</option>";	
			filter = filter+"<option value='MiddleName'>MiddleName</option>";	
			filter = filter+"<option value='UserType'>UserType</option>";	
			filter = filter+"<option value='GroupName'>GroupName</option>";	
			filter = filter+"<option value='Domain'>Domain</option>";	
		
			html = html+"<th>Start Reservation</th>";
			html = html+"<th>End Reservation</th>";
			html = html+"<th>Utilization</th>";
			html = html+"<th>Status</th>";
			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";	

			for (a=0; a< jsonData.root.row.length; a++){
				var MiddleName = jsonData.root.row[a].MiddleName;
					if (MiddleName == ''){
						MiddleName = 'N/A';
					}
				var Manager = jsonData.root.row[a].Manager;
					if (Manager == ''){
						Manager = 'N/A';
					}
				html += "<tr class='trStat'>";
				html += "<td>"+jsonData.root.row[a].UserName+"</td>";
				html += "<td>"+jsonData.root.row[a].LastName+"</td>";
				html += "<td>"+jsonData.root.row[a].FirstName+"</td>";
				html += "<td>"+MiddleName+"</td>";
				html += "<td>"+jsonData.root.row[a].UserLevel+"</td>";
				html += "<td>"+jsonData.root.row[a].GroupName+"</td>";
				html += "<td>"+jsonData.root.row[a].Domain+"</td>";
				

					
				html += "<td>"+jsonData.root.row[a].Start+"</td>";
				html += "<td>"+jsonData.root.row[a].End+"</td>";
				html += "<td>"+jsonData.root.row[a].Duration+"</td>";
				html += "<td>"+jsonData.root.row[a].Status+"</td>";
				html += "</tr>";
			}
		html = html+"</tbody>";
		$("#domain-table1").empty().append(html);
		$("#domain-table1 tbody").last().addClass('last');
		$("#filterStatUsers").empty().append(filter);
		$("#filterStatUsers tbody").last().addClass('last');
		$("#domain-table1").table( "refresh" );
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('DeviceId');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
		filterStatU();
		}
	});
}



/*
 #######################################################################
 #
 #  FUNCTION NAME : filterStatDomain
 #  AUTHOR        : Maureen Daelo
 #  DATE          : February 5,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Statistics Domain page
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterStatDomain(){
	var $rows = $('#domain-table0 tr:gt(0)');
	$('.DomainSearchFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterStat option:selected').text();
		var colval = $('#filterStat').val();
		var colnum = '';


		if (globalStatSelect == 'Device'){
			if (globalViewStatSelect == 'Detailed'){
				
				if(colval == "DeviceId"){
					colnum = 0
				}else if(colval == "HostName"){
					colnum = 2
				}else if(colval == "ManagementIp"){
					colnum = 3
				}else if(colval == "ConsoleIp"){
					colnum = 4
				}else if(colval == "Manufacturer"){
					colnum = 5
				}else if(colval == "Model"){
					colnum = 6
				}else if(colval == "DeviceType"){
					colnum = 7
				}
			}else if (globalViewStatSelect == 'Summary'){
				if(colval == "Model"){
					colnum = 0
				}else if(colval == "Manufacturer"){
					colnum = 2
				}
			}
		}else if (globalStatSelect == 'Slot'){
			if (globalViewStatSelect == 'Detailed'){
				if(colval == "DeviceId"){
					colnum = 0
				}else if(colval == "HostName"){
					colnum = 2
				}else if(colval == "Number"){
					colnum = 3
				}else if(colval == "ProductIdentifier"){
					colnum = 4
				}else if(colval == "Description"){
					colnum = 5
				}


			}else if (globalViewStatSelect == 'Summary'){
				if(colval == "ProductIdentifier"){
					colnum = 0
				}
			}
		}else if (globalStatSelect == 'Module'){
			if (globalViewStatSelect == 'Detailed'){
				if(colval == "DeviceId"){
					colnum = 0
				}else if(colval == "HostName"){
					colnum = 2
				}else if(colval == "SlotNumber"){
					colnum = 3
				}else if(colval == "SlotProductId"){
					colnum = 4
				}else if(colval == "ModuleNumber"){
					colnum = 5
				}else if(colval == "ModuleProductId"){
					colnum = 6
				}else if(colval == "ModuleDescription"){
					colnum = 7
				}


			}else if (globalViewStatSelect == 'Summary'){
				if(colval == "ProductIdentifier"){
					colnum = 0
				}
			}
		}else if (globalStatSelect == 'Port'){
			if (globalViewStatSelect == 'Detailed'){
				if(colval == "HostName"){
					colnum = 2
				}else if(colval == "SlotNumber"){
					colnum = 3
				}else if(colval == "SlotProductId"){
					colnum = 4
				}else if(colval == "ModuleNumber"){
					colnum = 5
				}else if(colval == "ModuleProductId"){
					colnum = 6
				}else if(colval == "PortName"){
					colnum = 7
				}else if(colval == "PortNumber"){
					colnum = 8
				}else if(colval == "MediaType"){
					colnum = 9
				}else if(colval == "Speed"){
					colnum = 10
				}else if(colval == "PortDescription"){
					colnum = 11
				}
			}else if (globalViewStatSelect == 'Summary'){
				if(colval == "HostName"){
					colnum = 2
				}
			}

		}



    	$rows.show().filter(function() {
			console.log("please naman gumana ka na");
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
 #  FUNCTION NAME : filterStatUser
 #  AUTHOR        : Maureen Daelo
 #  DATE          : February 7, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : filter for Statistics User page
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function filterStatU(){
	var $rows = $('#domain-table1 tr:gt(0)');
	$('.DomainSearchFilter').keyup(function(){
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        	reg = RegExp(val, 'i'),
        	text;
	
		var colval = $('#filterStatUsers option:selected').text();
		var colval = $('#filterStatUsers').val();
		var colnum = '';


		if(colval == "UserName"){
			colnum = 0
		}else if(colval == "LastName"){
			colnum = 1
		}else if(colval == "FirstName"){
			colnum = 2
		}else if(colval == "MiddleName"){
			colnum = 3
		}else if(colval == "UserType"){
			colnum = 4
		}else if(colval == "GroupName"){
			colnum = 5
		}else if(colval == "Domain"){
			colnum = 6
		}




    	$rows.show().filter(function() {
			console.log("please naman gumana ka na");
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
 #  FUNCTION NAME : showMoreStats
 #  AUTHOR        : Maureen Daelo
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : January 31, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : slection in statistics domain page
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function showMoreStats(){

	
	globalStatLimit += 10;
	if (globalStatSelect == 'Device'){
		if (globalViewStatSelect == 'Detailed'){
			DeviceDetailedTable(globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate);					
		}else if (globalViewStatSelect == 'Summary'){
			DeviceSummaryTable();
		}
	}else if (globalStatSelect == 'Slot'){
		if (globalViewStatSelect == 'Detailed'){
			SlotDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			SlotSummaryTable();
		}
	}else if (globalStatSelect == 'Module'){
		if (globalViewStatSelect == 'Detailed'){
			ModuleDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			ModuleSummaryTable();
		}
	}else if (globalStatSelect == 'Port'){
		if (globalViewStatSelect == 'Detailed'){
			PortDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			PortSummaryTable();
		}

	}else{
		UserDeatiledTable();
		}
	$('#domain-table0').attr('style','display:all');
	$('#domain-table0-popup').attr('style','display:all');

}




/*
 #######################################################################
 #
 #  FUNCTION NAME : showMoreStatsUser
 #  AUTHOR        : Maureen Daelo
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : January 31, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : slection in statistics domain page
 #  PARAMETERS    : 
 #
 #######################################################################
*/


/*
 *
 *  FUNCTION NAME : UserSummaryTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 10, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize UserSummaryTable 
 *  PARAMETERS    : 
 *
 */

function UserSummaryTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=usersummaryview&limit='+globalStatLimit+'&page=1&view=Day&date='+globalDate+'&detailedview=Summary&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby+'&user='+globalUser+"&terminal="+terminal+"&switch="+switch1;

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
			var pages = root[0].getAttribute('pages');
			var total = root[0].getAttribute('total');
			$("#totalMatchesUser").empty().append(total);            
			var userD = "<thead id=rmResStat><tr class='ui-bar-d'>";
	
			userD = userD+"<th>UserName</th>";
			userD = userD+"<th>LastName</th>";
			userD = userD+"<th>FirstName</th>";
			userD = userD+"<th>MiddleName</th>";
			userD = userD+"<th>UserType</th>";
			userD = userD+"<th>GroupName</th>";
			userD = userD+"<th>Domain</th>";

			var filter = "<option value='UserName'>UserName</option>";
			filter = filter+"<option value='LastName'>LastName</option>";	
			filter = filter+"<option value='FirstName'>FirstName</option>";	
			filter = filter+"<option value='MiddleName'>MiddleName</option>";	
			filter = filter+"<option value='UserType'>UserType</option>";	
			filter = filter+"<option value='GroupName'>GroupName</option>";	
			filter = filter+"<option value='Domain'>Domain</option>";	
			userD = userD+"<th>Manager Name</th>";
			userD = userD+"<th>Max Number of Reservation</th>";
			filter = filter+"<option value='Manager'>Manager Name</option>";

			if (globalStatsViewNew == 'Utilization'){
				
				userD = userD+"<th>Idle(Hrs Mins)</th>";
				userD = userD+"<th>Reservation(Hrs Mins)</th>";
				userD = userD+"<th>Idle(%)</th>";
				userD = userD+"<th>Reservation(%)</th>";
			}else if(globalStatsViewNew == 'Reservation'){

				userD = userD+"<th>No. of Scheduled</th>";
				userD = userD+"<th>No. of ReScheduled</th>";
				userD = userD+"<th>Cancelled</th>";
				userD = userD+"<th>Schedulled(%)</th>";
				userD = userD+"<th>Re-Scheduled(%)</th>";
				userD = userD+"<th>Cancelled(%)</th>";
			}	
				
			userD = userD+"</tr></thead><tbody id='tbodyDevice'><tr>";	

			for (a=0; a< row.length; a++){
				var MiddleName = row[a].getAttribute('MiddleName');
					if (MiddleName == ''){
						MiddleName = 'N/A';
					}
				var Manager = row[a].getAttribute('Manager');
					if (Manager == ''){
						Manager = 'N/A';
					}
				userD += "<tr class='trStat'>";
				userD += "<td>"+row[a].getAttribute('UserName')+"</td>";
				userD += "<td>"+row[a].getAttribute('LastName')+"</td>";
				userD += "<td>"+row[a].getAttribute('FirstName')+"</td>";
				userD += "<td>"+MiddleName+"</td>";
				userD += "<td>"+row[a].getAttribute('UserLevel')+"</td>";
				userD += "<td>"+row[a].getAttribute('GroupName')+"</td>";
				userD += "<td>"+row[a].getAttribute('Domain')+"</td>";
							
				userD += "<td>"+Manager+"</td>";
				userD += "<td>"+row[a].getAttribute('MaxReservation')+"</td>";

				 if (globalStatsViewNew == 'Utilization'){

					userD += "<td>"+row[a].getAttribute('Idle')+"</td>";
					userD += "<td>"+row[a].getAttribute('Util')+"</td>";
					userD += "<td>"+row[a].getAttribute('PercentIdle')+"</td>";
					userD += "<td>"+row[a].getAttribute('PercentUtil')+"</td>";
				}else if(globalStatsViewNew == 'Reservation'){
						
					userD += "<td>"+row[a].getAttribute('Pass')+"</td>";
					userD += "<td>"+row[a].getAttribute('Fail')+"</td>";
					userD += "<td>"+row[a].getAttribute('Cancel')+"</td>";
					userD += "<td>"+row[a].getAttribute('PassPercent')+"</td>";
					userD += "<td>"+row[a].getAttribute('FailPercent')+"</td>";
					userD += "<td>"+row[a].getAttribute('CancelPercent')+"</td>";
				}
				
				userD += "</tr>";
			}
		userD = userD+"</tbody>";
		$("#domain-table1").empty().append(userD);
		$("#domain-table1 tbody").last().addClass('last');
		$("#filterStatUsers").empty().append(filter);
		$("#filterStatUsers tbody").last().addClass('last');
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){
//				globalResourceId = [];
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#ReserveButtons').show();
					var val = $(this).attr('DeviceId');
//					groupHighlight(val);	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');
//					groupRemoveHighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
//					$('#ReserveButtons').hide();
				}	
			});
		filterStatU();
		}
	});
}




/*
 *
 *  FUNCTION NAME : UserSummaryTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 10, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize UserSummaryTable 
 *  PARAMETERS    : 
 *
 */


function highLightId(){
	var checkId2 = [];

	console.log("pasok sa grapg");
	var parser = new DOMParser();
	for (var d=0; d<$('.trStat').length; d++){		
		var clas = $('.trStat')[d].getAttribute('class');
		var ids = $('.trStat')[d].getAttribute('id');
		if (clas == 'trStat highlight'){
//			checkId	+= ','+ids;
			checkId2.push(ids);
			getDeviceHostName(ids);
		}
	}
	return checkId2;
	console.log(checkId2+'-------hahahaha------');
	//	console.log(checkId+'	'+checkId2+'	'+clas);
	//return checkId2;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getDeviceHostName
 #  AUTHOR        :	Maureen Daelo 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : February 13, 2014
 #  DESCRIPTION   : gets hostname of device
 #  PARAMETERS    : device id
 #
 #######################################################################
*/

function getDeviceHostName(ids){

	var view;
	var view2;
	var view = getView();	
	view2 = globalViewStatSelect;
 	var id = ids;
/*	if (refreshFlagResource == 'ReservationDevice') {
		view = "0";
		view2 = "Detailed";
	} else {
		if (brviews == "Domain") {
			view = $('#statSelect').val();
			view2 = $('#viewStatSelect').val();
			/*if (view != 0 && view != 2) {
				view2 = "Detailed";
			}////*
		} else {
			view = "5";
			view2 = "Detailed";
	  	  }
	  }
*/
    var retval;
    var cgiurl = 'http://'+CURRENT_IP+'/cgi-bin/Final/NFast_STAT/NFastSTATCGI.py?action=getDevHost&query=id='+id+'^view='+view+'^view2='+view2;

    $.ajax({
        url: cgiurl,
        dataType: 'text/xml',
        async: false,
        success: function(data){
            retval = $.trim(data);
			console.log(retval+"plssssss");
			
        }
    });
//	console.log(data+'plsssssss');
//    returno retval;

}



/*
 *
 *  FUNCTION NAME : createGraph
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 10, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize UserSummaryTable 
 *  PARAMETERS    : 
 *
 */


function createGraph(action){
	var id = '';
	var rList = [];
	var checkId2 = highLightId();
	if (checkId2.length == 1){
		id = checkId2[0];
	}else{
		for (var a=0; a<checkId2.length; a++){
			id += checkId2[a]+',';
			var host = getDeviceHostName();
//			rList.push(host);
		}

	}
	var action = '';
	if (globalStatSelect == 'Device'){
		if (globalViewStatSelect == 'Detailed'){
			action = 'devicedetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			action = 'modelstatsgraphtest';
		}
	}else if (globalStatSelect == 'Slot'){
		if (globalViewStatSelect == 'Detailed'){
			action = 'slotdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			action = 'slotstatsgraphtest';
		}
	}else if (globalStatSelect == 'Module'){
	 	if (globalViewStatSelect == 'Detailed'){
			action = 'moduledetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			action = 'modulestatsgraphtest';
		}
	}else if (globalStatSelect == 'Port'){
		if (globalViewStatSelect == 'Detailed'){
			action = 'portdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			action = 'portstatsgraphtest';
		}

	}
    var cgiurl = 'http://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action='+action+'&id='+id+'&start=2014-02-15&end=2014-02-15&terminal='+globalTerminal+'&switch='+globalSwitch;
    $.ajax({
        url: cgiurl,
        dataType: 'text/xml',
        async: false,
        success: function(data){
            retval = $.trim(data);
        }
    });
	
//https://172.24.1.11/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedgraphtest&id=11984&start=2014-02-15&end=2014-02-15&terminal=no&switch=no

	title: {
		text: 'Reservation Duration'
//			x: -20 //center
	}
	subtitle: {
		text: 'Date and view'
//		x: -20
	}
	xAxis: {
		categories: rList
	}
	yAxis: {
		title: {
			text: 'Reservation(Hours)'
		}
		plotLines: [{
			value: 0,
				width: 1,
				color: '#808080'
		}]
	}
//	legend: {
//		layout: 'vertical',
//		align: 'right',
//		horizontalAlign: 'middle',
//		borderWidth: 0
//	}
	series: [{
		name: 'Tokyo',
		data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	}, {
		name: 'New York',
		data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
	}, {
		name: 'Berlin',
		data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
	}, {
		name: 'London',
		data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	}]

}






/*
 *
 *  FUNCTION NAME : getView
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 10, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : globalStatSelect
 *  PARAMETERS    : 
 *
 */



function getView(){
	view = '';
	if (globalStatSelect == 'Device'){
		view = '0';
	}else if (globalStatSelect == 'Slot'){
		veiw = '2';
	}else if (globalStatSelect == 'Module'){
		view = '3';
	}else if (globalStatSelect == 'Module'){
		view = '4';
	}else{
		view = '5';
	}
	return view;	


}



/*
 *
 *  FUNCTION NAME : SummaryTableHeader
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 17, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : default header of all domain table in summary view
 *  PARAMETERS    : 
 *
 */


function SummaryTableHeader(deviceD){
	
	if (globalStatsViewNew == 'Utilization'){
		deviceD = deviceD+"<th data-priority='2'>Idle(Hrs Mins)</th>";
		deviceD = deviceD+"<th data-priority='2'>Reserved(Hrs Mins)</th>";
		deviceD = deviceD+"<th data-priority='2'>Idle(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Reservation(%)</th>";
	}else if(globalStatsViewNew == 'Reservation'){
		
		deviceD = deviceD+"<th data-priority='2'>Scheduled</th>";
		deviceD = deviceD+"<th data-priority='2'>Generic</th>";
		deviceD = deviceD+"<th data-priority='2'>Explicit</th>";
		deviceD = deviceD+"<th data-priority='2'>Re-Scheduled</th>";
		deviceD = deviceD+"<th data-priority='2'>Generic</th>";
		deviceD = deviceD+"<th data-priority='2'>Explicit</th>";
		deviceD = deviceD+"<th data-priority='2'>Cancelled</th>";
		deviceD = deviceD+"<th data-priority='2'>Scheduled(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Generic(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Explicit(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Re-Scheduled(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Generic(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Explicit(%)</th>";
		deviceD = deviceD+"<th data-priority='2'>Cancelled(%)</th>";
	}
	deviceD = deviceD+"</tr></thead><tbody id='tbodyDevice'><tr>";

	return deviceD;
}




/*
 *
 *  FUNCTION NAME : DeviceSummaryTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 17, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : parsing for all domain table in summary view
 *  PARAMETERS    : 
 *
 */

function DeviceSummaryTableContent(jsonData,html){
	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].Note+"'>";
		//deviceD += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].Name+"</td>";
		html += "<td>"+jsonData.root.row[a].NumberOfDevices+"</td>";
		html += "<td>"+jsonData.root.row[a].Manufacturer+"</td>";

		var TotalPercentIdle = jsonData.root.row[a].TotalPercentIdle;
			if (TotalPercentIdle == ''){
				TotalPercentIdle = '0.00';
			}
		var PassPercent = jsonData.root.row[a].PassPercent;
			if (PassPercent == ''){
				PassPercent = '0.00';
			}
		var PercentGeneric = jsonData.root.row[a].PercentGeneric;
			if (PercentGeneric == ''){
				PercentGeneric = '0.00';
			}
		var PercentExplicit = jsonData.root.row[a].PercentExplicit;
			if (PercentExplicit == ''){
				PercentExplicit = '0.00';
			}
		var PercentGenericFailed = jsonData.root.row[a].PercentGenericFailed;
			if (PercentGenericFailed == ''){
				PercentGenericFailed = '0.00';
			}
		var PercentExplicitFailed = jsonData.root.row[a].PercentExplicitFailed;
			if (PercentExplicitFailed == ''){
				PercentExplicitFailed = '0.00';
			}
		var CancelPercent = jsonData.root.row[a].CancelPercent;
			if (CancelPercent == ''){
				CancelPercent = '0.00';
			}
		if (globalStatsViewNew == 'Utilization'){
			html += "<td>"+jsonData.root.row[a].AverageIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].AverageDuration+"</td>";
			html += "<td>"+TotalPercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].AverageUtilization+"</td>";
		}else if(globalStatsViewNew == 'Reservation'){
			html += "<td>"+jsonData.root.row[a].PassCount+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Failed+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].Cancelled+"</td>";
			html += "<td>"+PassPercent+"</td>";
			html += "<td>"+PercentGeneric+"</td>";
			html += "<td>"+PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].FailedPercent+"</td>";
			html += "<td>"+PercentGenericFailed+"</td>";
			html += "<td>"+PercentExplicitFailed+"</td>";
			html += "<td>"+CancelPercent+"</td>";
			}
		html += "</tr>";
	}
	console.log(html);
	return html
}



/*
 *
 *  FUNCTION NAME : TableHeader
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : default header column in domain all table
 *  PARAMETERS    : 
 *
 */


function TableHeader(html){
	

	if (globalStatsViewNew == 'Utilization'){
		html = html+"<th data-priority='3'>Idle(Hrs/Mins)</th>";
		html = html+"<th data-priority='3'>Reservation</th>";
		html = html+"<th data-priority='6'>Idle(%)</th>";
		html = html+"<th data-priority='6'>Reservation (%)</th>";
	}else if(globalStatsViewNew == 'Reservation'){
		html = html+"<th data-priority='3'>Scheduled</th>";
		html = html+"<th data-priority='6'>Generic</th>";
		html = html+"<th data-priority='6'>Explicit</th>";
		html = html+"<th data-priority='3'>Re-Scheduled</th>";
		html = html+"<th data-priority='6'>Generic</th>";
		html = html+"<th data-priority='6'>Explicit</th>";
		html = html+"<th data-priority='3'>Cancelled</th>";
		html = html+"<th data-priority='6'>Scheduled(%)</th>";
		html = html+"<th data-priority='6'>Generic(%)</th>";
		html = html+"<th data-priority='6'>Explicit(%)</th>";
		html = html+"<th data-priority='6'>Re-Scheduled(%)</th>";
		html = html+"<th data-priority='6'>Generic(%)</th>";
		html = html+"<th data-priority='6'>Explicit(%)</th>";
		html = html+"<th data-priority='6'>Cancelled(%)</th>";

		}


	return html;
}


/*
 *
 *  FUNCTION NAME : DeviceDetailedTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : default header column in domain all table
 *  PARAMETERS    : 
 *
 */


function DeviceDetailedTableContent(jsonData,html){


	html = html+"<th data-priority='1'>ID</th><th>Date Added</th>";
	html = html+"<th data-priority='1'>HostName</th>";
	html = html+"<th data-priority='1'>MgmtIP</th>";
	html = html+"<th data-priority='1'>Console IP</th>";
	html = html+"<th data-priority='6'>Manufacturer</th>";
	html = html+"<th data-priority='6'>Model</th>";
	html = html+"<th data-priority='1'>Device Type</th>";
	html = TableHeader(html);
	html = html+"<th data-priority='6'>os version</th>";
	html = html+"<th data-priority='6'>system memory</th>";
	html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";

	for (a=0; a< jsonData.root.row.length; a++){
		
		html += "<tr class='trStat' id='"+jsonData.root.row[a].DeviceId+"'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		var ManagementIp = jsonData.root.row[a].ManagementIp;
			if (ManagementIp == ''){
				ManagementIp = 'N/A';
			}
		html += "<td>"+jsonData.root.row[a].ManagementIp+"</td>";
		var ConsoleIp = jsonData.root.row[a].ConsoleIp;
		if (ConsoleIp == ''){
			ConsoleIp = 'N/A';
		}			
		html += "<td>"+ConsoleIp+"</td>";
		html += "<td>"+jsonData.root.row[a].Manufacturer+"</td>";
		html += "<td>"+jsonData.root.row[a].Model+"</td>";
		html += "<td>"+jsonData.root.row[a].DeviceType+"</td>";
		if (globalStatsViewNew == 'Utilization'){
			html += "<td>"+jsonData.root.row[a].Idle+"</td>";
			html += "<td>"+jsonData.root.row[a].Util+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentUtil+"</td>";
		}else if(globalStatsViewNew == 'Reservation'){
			html += "<td>"+jsonData.root.row[a].Pass+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Fail+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].NumberOfCancellation+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentPass+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentFail+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentCancel+"</td>";

		}
		var OSVersion = jsonData.root.row[a].OSVersion;
		if (OSVersion == ''){
			OSVersion = 'N/A';
		}
		html += "<td>"+OSVersion+"</td>";
		var SystemMemory = jsonData.root.row[a].SystemMemory;
		if (SystemMemory == ''){
			SystemMemory = 'N/A';
		}
		html += "<td>"+SystemMemory+"</td>";
		html += "</tr>";
	}
	return html;
}



/*
 *
 *  FUNCTION NAME : SlotDetailedTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function SlotDetailedTableContent(jsonData,html){


	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].ProductIdentifier+"'>";
		var ProductIdentifier = jsonData.root.row[a].ProductIdentifier;
		if (ProductIdentifier == ''){
			ProductIdentifier = 'N/A';
		}
		var Description = jsonData.root.row[a].Description;
		if (Description == ''){
			Description = 'N/A';
		}
		//deviceD += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		html += "<td>"+jsonData.root.row[a].Number+"</td>";
		html += "<td>"+ProductIdentifier+"</td>";
		html += "<td>"+Description+"</td>";
	
		if (globalStatsViewNew == 'Utilization'){
			html += "<td>"+jsonData.root.row[a].Idle+"</td>";
			html += "<td>"+jsonData.root.row[a].Util+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentUtil+"</td>";

		}else if(globalStatsViewNew == 'Reservation'){
			html += "<td>"+jsonData.root.row[a].Pass+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Fail+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].NumberOfCancellation+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentPass+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentFail+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentCancel+"</td>";


		}
		html += "</tr>";
	}			

	return html;
}




/*
 *
 *  FUNCTION NAME : SlotSummaryTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function SlotSummaryTableContent(jsonData,html){

	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].Name+"'>";
	//	SlotS += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].Name+"</td>";
		html += "<td>"+jsonData.root.row[a].NumberOfSlots+"</td>";

		if (globalStatsViewNew == 'Utilization'){
			html += "<td>"+jsonData.root.row[a].AverageIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].AverageDuration+"</td>";
			html += "<td>"+jsonData.root.row[a].AveragePercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].TotalPercentUtilization+"</td>";
		}else if(globalStatsViewNew == 'Reservation'){

			html += "<td>"+jsonData.root.row[a].PassCount+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Failed+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].Cancelled+"</td>";
			html += "<td>"+jsonData.root.row[a].PassPercent+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].FailedPercent+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].CancelPercent+"</td>";

		}
		html += "</tr>";
	}
	return html;
}



/*
 *
 *  FUNCTION NAME : ModuleDetailedTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function ModuleDetailedTableContent(jsonData,html){

	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].DeviceId+"'>";
//				moduleD  += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		html += "<td>"+jsonData.root.row[a].SlotNo+"</td>";
		html += "<td>"+jsonData.root.row[a].SlotProductIdentifier+"</td>";
		html += "<td>"+jsonData.root.row[a].ModuleNo+"</td>";
		html += "<td>"+jsonData.root.row[a].Description+"</td>";

		if (globalStatsViewNew == 'Utilization'){

			html += "<td>"+jsonData.root.row[a].Idle+"</td>";
			html += "<td>"+jsonData.root.row[a].Util+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentUtil+"</td>";
		}else if(globalStatsViewNew == 'Reservation'){

			html += "<td>"+jsonData.root.row[a].Pass+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Fail+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].NumberOfCancellation+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentPass+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentFail+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentCancel+"</td>";
		}
		html += "</tr>";
	}
	return html;
}


/*
 *
 *  FUNCTION NAME : ModuleSummaryTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function ModuleSummaryTableContent(jsonData,html){
	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].Name+"'>";
//				moduleS += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].Name+"</td>";
		html += "<td>"+jsonData.root.row[a].NumberOfModules+"</td>";

		if (globalStatsViewNew == 'Utilization'){

			html += "<td>"+jsonData.root.row[a].AverageIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].AverageDuration+"</td>";
			html += "<td>"+jsonData.root.row[a].AveragePercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].TotalPercentUtilization+"</td>";

		}else if(globalStatsViewNew == 'Reservation'){

			html += "<td>"+jsonData.root.row[a].PassCount+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Failed+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].Cancelled+"</td>";
			html += "<td>"+jsonData.root.row[a].PassPercent+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].FailedPercent+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].CancelPercent+"</td>";

		}
		html += "</tr>";
	}
	return html;
}


/*
 *
 *  FUNCTION NAME : PortDetailedTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function PortDetailedTableContent(jsonData,html){

	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].DeviceId+"'>";
//				PortD += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		html += "<td>"+jsonData.root.row[a].SlotNumber+"</td>";
		html += "<td>"+jsonData.root.row[a].SlotProductId+"</td>";
		html += "<td>"+jsonData.root.row[a].ModuleNumber+"</td>";
		html += "<td>"+jsonData.root.row[a].ModuleProductId+"</td>";
		html += "<td>"+jsonData.root.row[a].PortName+"</td>";
		html += "<td>"+jsonData.root.row[a].PortNumber+"</td>";
		html += "<td>"+jsonData.root.row[a].MediaType+"</td>";
		html += "<td>"+jsonData.root.row[a].Speed+"</td>";
		html += "<td>"+jsonData.root.row[a].PortDescription+"</td>";
		html += "<td>"+jsonData.root.row[a].PartnerDevice+"</td>";
	
		if (globalStatsViewNew == 'Utilization'){
			html += "<td>"+jsonData.root.row[a].Idle+"</td>";
			html += "<td>"+jsonData.root.row[a].Util+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentUtil+"</td>";
		}else if(globalStatsViewNew == 'Reservation'){
			html += "<td>"+jsonData.root.row[a].Pass+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Fail+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].NumberOfCancellation+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentPass+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentFail+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentCancel+"</td>";
		}
		html += "</tr>";
	}			
	return html;
}



/*
 *
 *  FUNCTION NAME : PortSummaryTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function PortSummaryTableContent(jsonData,html){

	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].Name+"'>";
		//		portS += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].Name+"</td>";
		html += "<td>"+jsonData.root.row[a].NumberOfPorts+"</td>";

		if (globalStatsViewNew == 'Utilization'){

			html += "<td>"+jsonData.root.row[a].AverageIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].AverageDuration+"</td>";
			html += "<td>"+jsonData.root.row[a].AveragePercentIdle+"</td>";
			html += "<td>"+jsonData.root.row[a].TotalPercentUtilization+"</td>";

		}else if(globalStatsViewNew == 'Reservation'){

			html += "<td>"+jsonData.root.row[a].PassCount+"</td>";
			html += "<td>"+jsonData.root.row[a].Generic+"</td>";
			html += "<td>"+jsonData.root.row[a].Explicit+"</td>";
			html += "<td>"+jsonData.root.row[a].Failed+"</td>";
			html += "<td>"+jsonData.root.row[a].GenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].ExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].Cancelled+"</td>";
			html += "<td>"+jsonData.root.row[a].PassPercent+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGeneric+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicit+"</td>";
			html += "<td>"+jsonData.root.row[a].FailedPercent+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentGenericFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].PercentExplicitFailed+"</td>";
			html += "<td>"+jsonData.root.row[a].CancelPercent+"</td>";

		}
		html += "</tr>";
	}
	return html;
}


/*
 *
 *  FUNCTION NAME : DeviceDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 1, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize DeviceTable in detailed view
 *  PARAMETERS    : 
 *
 */


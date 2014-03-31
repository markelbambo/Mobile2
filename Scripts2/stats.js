

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
	globalDate = '';
//	var date =  "<input name='select-native-2' data-inline='true' id='datePickerStat' onfocus='this.blur();'>";
//	$("#statsView2").empty().append(date);
	var aa = datePickerStat();
//	console.log(aa+"qwert");
//	$("#statsView option:selected").val();
	
//	console.log("sdf");
//	var view = $("#statsView option:selected").html();
	if (globalStatsView == "Daily" || globalStatsView == 'Day'){
		date = "<input name='select-native-2' data-inline='true' id='datePickerStat' onfocus='this.blur();'>"
//console.log("wahaha");
	}else if (globalStatsView == "Weekly" || globalStatsView == 'Week'){
			var startDate,endDate;
			var string = "<input onclick='clickPicker()' id='statTime' class='datepicker selecText' type='text' style='width: 170px; border: solid 1px #989898' onKeypress='return false' onpaste='return false' readonly='yes'>";
			$('#statsView2').empty().append(string);
/*			$('#statTime').datepicker({
    	        dateFormat: 'yy-mm-dd',
        		showOn: 'focus',
				showOtherMonths: false,
		        selectOtherMonths: false,
				firstDay: 0,
		        onSelect: function(dateText, inst) { 
					firstLoad=0
					$.each(jQuery.browser, function(i, val) {
				   		if (i=='safari' && val ==true) {
				    	    currbrowser = 'safari';
				 		} else if (i=='mozilla' && val ==true) {
				            currbrowser = 'mozilla';
				   		  }
					});
					var date;
					if (currbrowser != 'safari') {
	        		    date = new Date(dateText);
					} else {
						var dArray = dateText.split("-");  
						date = new Date(dArray[0],dArray[1]-1,dArray[2]);  
					  }
	                startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
        			endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
		        	var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
        		    var start = $.datepicker.formatDate( dateFormat, startDate, inst.settings );
		            var end = $.datepicker.formatDate( dateFormat, endDate, inst.settings );
					$('#statTime').val(start+","+end);
                    selectCurrentWeek();
					if(globalPowerLoad == ""){
						FinalStatTable();
					}else{
						createGraphPower();
					}
			    }//,
/*		        beforeShowDay: function(date) {
        			var cssClass = '';
		            if(date >= startDate && date <= endDate)
        		        cssClass = 'ui-datepicker-current-day';
		            return [true, cssClass];
		        },
		        onChangeMonthYear: function(year, month, inst) {
        		    selectCurrentWeek();
		        }
			});			*/
   		    var date = new Date();
	        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    	    endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
		    var dateFormat = "yy-mm-dd";
            var start = $.datepicker.formatDate( dateFormat, startDate);
		    var end = $.datepicker.formatDate( dateFormat, endDate);
			$('#statTime').val(start+","+end);
			globalDate = start+","+end;
//            selectCurrentWeek();
//			refreshAvailability = true;
	//	date = "<input name='select-native-2' type='text' placeholder='Date' data-inline='true' id='datePickerStat' onfocus='this.blur();'>"
	
	}else if (globalStatsView == "Monthly" || globalStatsView == 'Month'){
/*		var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
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
		date = "<table><td><select name=\"select-native-2\" id=\"statsViewYear\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Year</option>"+yy+"</td><td><select name=\"select-native-2\" id=\"statsViewMonth\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Month</option>"+mm+"</td></table>";*/
			var date = new Date();
   		    var newMonth;
        		newMonth = date.getMonth()+1;
			var year = date.getFullYear();
//			if(globalPowerLoad == ""){
//				var string = "<select onclick='clickPicker();' id='statTime"+tmR+"' style='width:100px' onchange='FinalStatTable()'>";
//			}else{
			globalStatsView == "Monthly";
				var string = "<select onchange='statsViewDate();' id='statTime' style='width:100px'>";
//			}
			var newg;
			var monNam = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
			for (var g = 0; g < monNam.length; g++) {
				if ((g+1) == newMonth) {
					if ((g+1) < 10) {
						newg = "0"+(g+1);	
					} else {
						newg = g+1;
					}
					string += "<option  onchange='statsViewDate();' value='"+newg+"' selected='selected'>"+monNam[g]+"</option>";
				} else {
					if ((g+1) < 10) {
						newg = "0"+(g+1);	
					} else {
						newg = g+1;
					}
					string += '<option value="'+year+'-'+newg+'">'+monNam[g]+'</option>';
				}
			}			
			string += "</select>";
			$('#statsView2').empty().append(string);
		var yyyy = 2014;
		var yy = "<select id='sYear'  onchange='statsViewDate('Monthly');'><option value=\""+yyyy+"\">"+yyyy+"</option>";
		for(var x=0; x<20; x++){
			yyyy = yyyy + 1;
			yy += "<option value=\""+yyyy+"\">"+yyyy+"</option>";
			
		}
		yy = yy+"</select>"
		$('#statsView3').empty().append(yy);
//			refreshAvailability = true;
		var sDate = $('#statTime').val();
		var yr = $('#sYear').val();
		var mon = $('#statTime').html();
		if (mon == 'April' || mon == 'June"' || mon == 'September' || mon == 'November'){
			var LDay = '30'
		}else if(mon == "February"){
			if (yr == '2016' || yr == '2020' || yr == '2024' || yr == '2028'){
				var LDay = '29';
			}else{
				var LDay = '29';
			}
		}else{
			var LDay = '31';
		}
		sDate = yr+'-'+sDate+"-01,"+yr+'-'+sDate+'-'+LDay;
		//console.log(sDate);	
		globalStatsView = "Monthly";
		globalDate = '2014-03-01,2014-03-31';
	changeComponents();
	}else if (globalStatsView == "Quarterly" || globalStatsView == "Quarterly"){
/*		var quarter = new Array("Jan - Mar","Apr - Jun","Jul - Sep","Oct - Dec");		

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
*/
	globalDate = "2014-01-01,2014-03-31"
	globalStatsView = "Quarterly";
	changeComponents();
	}else if (globalStatsView == "Annually" || globalStatsView == "Annuall"){
	globalDate = "2014-01-01,2014-12-31"
	changeComponents();
/*		console.log(globalStatsView);

		var yyyy = 2000;
		var yy = "<option value=\""+yyyy+"\">"+yyyy+"</option>";
		var qq = "";
		for(var x=0; x<20; x++){
			yyyy = yyyy + 1;
			yy += "<option value=\""+yyyy+"\">"+yyyy+"</option>";
			
		}
		date = "<td><select name=\"select-native-2\" id=\"statsViewYear\" data-inline=\"true\"><option value=\"0\" style=\"display:none\">Year</option>"+yy+"</td>";
	}else if (globalStatsView == "Custom"){

		date = "<td><input name='select-native-2' type='text' placeholder='Start Date' data-inline='true' id='datePickerStat' onfocus='this.blur();'></td><td><input name='select-native-2' type='text' placeholder='End Date' data-inline='true' id='datePickerStat2' onfocus='this.blur();'></td>"*/
	}
	
	//$("#ulUser input").last().addClass('last');
	setTimeout(function(){
		datePickerStat();
		initDateStat();

	},500);
//$("#statsView2").empty().append(date);
//	$("#statsView2").listview("refresh"); 
//	$("#datePickerStat").listview("refresh"); 
//	$("#statsViewYear").listview("refresh"); 
//	$("#statsViewMonth").listview("refresh"); 
//	$("#datePickerStat2").listview("refresh"); 
		//console.log(sDate+"fkgjgjg");	
	console.log(globalStatSelect+"   ."+globalViewStatSelect+"   ."+globalStatsViewNew+"  ."+globalStatsView+"   ."+globalDomainContent+"   ."+globalDate);
	$("#statisticsDomainPage").trigger("create");
}
function showStat1(){
	$('#stat1').show();
	$('#stat2').hide();
	$('#stat3').hide();
}
function showStat2(){
	$('#stat1').hide();
	$('#stat2').show();
	$('#stat3').hide();
}
function showStat3(){
	$('#stat1').hide();
	$('#stat2').hide();
	$('#stat3').show();
}


function getUlDomains() {
        //url: 'httpss://'+CURRENT_IP+'/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?action=getUlDomains',
    var url = getURL("STAT")+"action=getUlDomains";
    $.ajax({
		url: url,
        dataType: 'html',
        async: false,
        success: function(data) {
            var statArr = new Array();
            var domains = $.trim(data).split("*")[0].split(",");
//            var str = "<li style='cursor:pointer' did2='All' did='Any' id='DomainAny' onclick=\"TotalFinalStatsTable(this.id,'Domain');onSelectedStat(this.id);\"><a>All</a></li>";
          	if (globalDeviceType != "Mobile"){
				var str = '';
				for (var f = 0; f < domains.length; f++){
                	var ids = domains[f].split("^")[0];
	                var domname = domains[f].split("^")[1];
					globalDomainContent = ids;
					str += "<li style='color: #39599c' name='6' value='"+ids+"'  id='"+ids+"' onclick='changeComponents();showStat2();'><a>"+domname+"</a></li>";
				}
//					str = "<li style='color: #39599c' name='6' value='Any'  id='Any' onclick='changeComponents(this.id);selectionDomain();showStat2();'><a>'All'</a></li>";
				$('#ulDomain').empty().append(str);	
				var str2 = '';
				for (var f = 0; f < domains.length; f++){
                	var ids = domains[f].split("^")[0];
	                var domname = domains[f].split("^")[1];
					globalDomainContent = ids;
					str2 += "<li style='color: #39599c' name='6' value='"+ids+"'  id='"+ids+"' onclick='UserSummaryTable2(this.id);changeComponentsUser();selectionUser();showStat3();'><a>"+domname+"</a></li>";
				}
//					str2 = "<li style='color: #39599c' name='6' value='Any'  id='Any' onclick='UserSummaryTable2(this.id);changeComponentsUser();selectionUser();showStat3();'><a>'All'</a></li>";
				$('#STATUser').empty().append(str2);	
				$("#statisticsPage").trigger("create"); 
			}else{ 
				var str = "<option value='Any'></option>";
				str = str+"<option value='Any'>All</option>";
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
			}
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
	if (globalDeviceType != "Mobile"){
		initDateStat();
		$("#statisticsPage").trigger("create");
	}else{
		initDateStat();
		$("#statisticsDomainPage").trigger("create");
	}
	changeComponents();
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
//	globalDate = dateToday;
	StatisticsSummary();	
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
	if (globalDeviceType != "Mobile"){   
		globalStatSelect = $('#statSelect').val();
		globalViewStatSelect = $('#viewStatSelect').val();
		globalStatsViewNew = $('#statsViewNew').val();
		globalStatsView = $('#statsView').val();
		$('#optionStat').show();
		$('#showGraphStat').show();
		$('#GenReStat').show();
		$('#domain-table1').hide();
		$('#domain-table0').show();
		$('#statSelect').show();
		$('#viewStatSelect').show();
		$('#statsViewNew').show();
		$('#statsView').show();
	$('#domain-table0').show();
	}
	//console.log(globalDomainContent+"qweerr");

	if (globalStatSelect == 'Device'){
		if (globalViewStatSelect == 'Detailed'){
			DeviceDetailedTable2();					
			action = 'devicedetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			DeviceSummaryTable2();
			action = 'modelstatsgraphtest';
		}
	}else if (globalStatSelect == 'Rack'){
		if (globalViewStatSelect == 'Detailed'){
			RackDetailedTable();
			action = 'slotdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			RackSummaryTable();
			action = 'slotstatsgraphtest';
		}
	}else if (globalStatSelect == 'Slot'){
		if (globalViewStatSelect == 'Detailed'){
			SlotDetailedTable2();
			action = 'slotdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			SlotSummaryTable2();
			action = 'slotstatsgraphtest';
		}
	}else if (globalStatSelect == 'Module'){
 	if (globalViewStatSelect == 'Detailed'){
			ModuleDetailedTable2();
			action = 'moduledetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			ModuleSummaryTable2();
			action = 'modulestatsgraphtest';
		}
	}else if (globalStatSelect == 'Port'){
		if (globalViewStatSelect == 'Detailed'){
			PortDetailedTable2();
			action = 'portdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			PortSummaryTable2();
			action = 'portstatsgraphtest';
		}
	}else if (globalStatSelect == 'SubChannel'){
		if (globalViewStatSelect == 'Detailed'){
			SubChannelDetailedTable();
			action = 'portdetailedgraphtest';
		}else if (globalViewStatSelect == 'Summary'){
			SubChannelSummaryTable();
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
//    var url = 'httpss://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query='+globalDate+"&domain="+globalDomainContent+'&limit=100&page=1&user='+globalUserName;//+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
//
	var url = getURL("STATDetailed")+'action=devicedetailedview&id=&limit='+globalStatLimit+'&page='+globalStatPage+'&view='+globalStatsView+'&date='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;
	
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "293","pages": "15","page": "1","row": [{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel":"0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","SerialNumber": "SSI161706V4","OSType": "IOS-XE","Model": "ASR1001","ManagementIp": "1.18.8.4","SoftwarePackage": "(X86_64_LINUX_IOSD-UNIVERSALK9-M)","OSVersion": "15.3(2)S1","DeviceId": "11984","DeviceType": "Dut","SystemMemory": "1133947K/6147K bytes","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006"},{"Connectivity": "4/0/4","HostName": "R5_R1","Util": "0 hr 0.00min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-01-28 22:52:09","SerialNumber": "FOX1537GF7Q","OSType":"IOS-XE","Model": "ASR1006","ManagementIp": "1.18.5.1","SoftwarePackage": "(X86_64_LINUX_IOSD-ADVENTERPRISEK9-M)","OSVersion":"15.3(20130208:132151)","DeviceId": "11992","DeviceType": "Dut","SystemMemory": "4208966K/6147K bytes","Manufacturer": "Cisco","ConsoleIp": "172.27.40.45:2003"},{"Connectivity": "4/0/2","HostName": "R6_R2","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel":"0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-01-28 22:52:09","SerialNumber": "FOX1309GNFV","OSType": "IOS-XE","Model": "ASR1004","ManagementIp": "1.18.6.2","SoftwarePackage": "(X86_64_LINUX_IOSD-ADVENTERPRISEK9-M)","OSVersion": "15.3(20130106:171358)","DeviceId": "12001","DeviceType":"Dut","SystemMemory": "4208216K/6147K bytes","Manufacturer": "Cisco","ConsoleIp": "172.27.41.163:2004"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}
			var filter = "<option value='deviceid'></option>";
			filter = filter+"<option value='Deviceid'>ID</option>";
			filter = filter+"<option value='HostName'>HostName</option>";
			filter = filter+"<option value='ManagementIp'>MgmtIp</option>";
			filter = filter+"<option value='ConsoleIp'>Console Ip</option>";
			filter = filter+"<option value='Manufacturer'>Manufacturer</option>";
			filter = filter+"<option value='Model'>Model</option>";
			filter = filter+"<option value='DeviceType'>DeviceType</option>";
			html = DeviceDetailedTableContent(jsonData,html);
			html = html+"</tbody>";
//			console.log(deviced);
//
			$("#filterstat").empty().append(filter);            
			$("#filterstat option").last().addClass('last');
			$("#domain-table0").empty().append(html);            
			$("#domain-table0 tbody").last().addClass('last');

			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
			var ctr;
			ctr = 0;	
			var val = '';
			var globalstatisticsid = [];
			$(".trStat").on("click",function(){
				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');
//				   	$('#showgraph').show();
					val = $(this).attr('id');
//					grouphighlight(val);	
//					globalstatisticsid.push(val);
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val2 = $(this).attr('id');
//					groupremovehighlight(val);	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){
					$('#showgraph').hide();
				}	
			});
			filterStatDomain();
		}
	});
	

	//var url = 'httpss://'+current_ip+'/cgi-bin/final/autocompleteadmin/fquerycgiadmin.fcgi?action=devicedetailedview&id=&limit=10000&page=1&view='+fview+'&date='+golbaldate+'&domain='+domain+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterval+"&sort="+sort+"&orderby="+orderby;
	
			//console.log(globalstatisticsid.length,'square root of negative one 2.0');
	
	$("#statisticsdomainpage").trigger("create");
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
	

	//var url = 'httpss://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedview&id=&limit=10000&page=1&view='+fview+'&date='+golbalDate+'&domain='+domain+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
	
			//console.log(globalStatisticsId.length,'square root of negative one 2.0');
}
*/
function changeComponent(num){
	//console.log(num+"==========");
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
//httpss://172.24.1.11/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query=2014-02-03,2014-02-03&domain=Any&limit=20&page=1&sort=&orderby=&user=mdaelo&filter=&terminal=no&switch=no


    var url = getURL("STATSummary")+'action=modelstats&query='+globalDate+"&domain="+globalDomainContent+'&limit='+globalStatLimit+'&page=1&user='+globalUserName+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view='+globalStatsView;

//+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
//	var url = httpss://172.24.1.11/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query=2014-02-03,2014-02-03&domain=Any&limit=20&page=1&sort=&orderby=&user=mdaelo&filter=&terminal=no&switch=no
	
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "56","pages": "3","page": "1","row": [{"Name": "ASR1001","Name2": "ASR1001","Manufacturer": "Cisco","UserType": "Administrator","NumberOfDevices": "24","AverageUtilization": "4.17","AverageDuration": "31 hrs 1.62 mins","AverageIdle": "712 hrs 58.38 mins","AveragePercentIdle": "95.83","TotalUtilization": "744 hrs38.92 mins","TotalIdle": "17111 hrs 21.08 mins","TotalPercentUtilization": "4.17","TotalPercentIdle": "95.83","ActualStartReservation": "2014-01-01","ActualEndReservation": "2014-01-31","PassCount": "1099","Failed": "0","Cancelled": "15","Generic": "433","Explicit": "666","GenericFailed": "0","ExplicitFailed": "0","PercentGeneric": "39.40","PercentExplicit": "60.60","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","PassPercent": "100.00","FailedPercent": "0.00","CancelPercent": "1.36"},{"Name": "ASR1006","Name2": "ASR1006","Manufacturer": "Cisco","UserType": "Administrator","NumberOfDevices": "25","AverageUtilization": "2.31","AverageDuration": "17 hrs 9.38 mins","AverageIdle": "726 hrs 50.62 mins","AveragePercentIdle": "97.69","TotalUtilization": "428 hrs54.57 mins","TotalIdle": "18171 hrs 5.43 mins","TotalPercentUtilization": "2.31","TotalPercentIdle": "97.69","ActualStartReservation": "2014-01-01","ActualEndReservation": "2014-01-31","PassCount": "804","Failed": "0","Cancelled": "3","Generic": "386","Explicit": "418","GenericFailed": "0","ExplicitFailed": "0","PercentGeneric": "48.01","PercentExplicit": "51.99","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","PassPercent": "100.00","FailedPercent": "0.00","CancelPercent": "0.37"},{"Name": "ASR1004","Name2":"ASR1004","Manufacturer": "Cisco","UserType": "Administrator","NumberOfDevices": "16","AverageUtilization": "1.95","AverageDuration": "14 hrs 31.36 mins","AverageIdle": "729 hrs 28.64 mins","AveragePercentIdle": "98.05","TotalUtilization": "232 hrs 21.76 mins","TotalIdle": "11671 hrs 38.24 mins","TotalPercentUtilization": "1.95","TotalPercentIdle": "98.05","ActualStartReservation": "2014-01-01","ActualEndReservation": "2014-01-31","PassCount": "384","Failed":"0","Cancelled": "0","Generic": "111","Explicit": "273","GenericFailed": "0","ExplicitFailed": "0","PercentGeneric": "28.91","PercentExplicit": "71.09","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","PassPercent": "100.00","FailedPercent": "0.00","CancelPercent": "0.00"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}
			
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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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

	
    var url = getURL('STATDetailed')+'action=slotdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
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
			
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}

			html = html+"<th data-priority='1'>DeviceID</th>";
			html = html+"<th data-priority='1'>Date Added</th>";
			html = html+"<th data-priority='1'>HostName</th>";
			html = html+"<th data-priority='1'>RackNumber</th>";
			html = html+"<th data-priority='1'>RackProductId</th>";
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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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

	
    var url = getURL('STATSummary')+'action=esprpstats&query='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page=1&view='+globalStatsView;
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
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}
			
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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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


	var url = getURL('STATDetailed')+'action=moduledetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+'&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal;


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
			
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}

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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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

	
    var url = getURL('STATSummary')+'action=modulestats&query='+globalDate+"&domain="+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page='+globalStatPage+'&view'+globalStatsView;//&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
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
			
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}

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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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

	
    var url = getURL('STATDetailed')+'action=portdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"row": [{"PartnerDevice": "MRV-12","Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","ModuleDescription": " 4-port Gigabit Ethernet Integrated DaughterCard ","PortDescription": "Hardware is ASR1001-IDC-4XGE","PortName": "GigabitEthernet0/2/1","Model": "ASR1001","SoftwarePackage":"(X86_64_LINUX_IOSD-UNIVERSALK9-M)","Speed": "1000","SlotProductId": "ASR1001-4X1GE","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber": "SSI161706V4","ModuleNumber": "2","MediaType": "unknown media type ","OSType": "IOS-XE","PortId": "9678","SlotNumber": "0","ManagementIp": "1.18.8.4","ModuleProductId": "ASR1001-IDC-4XGE","OSVersion": "15.3(2)S1","PortNumber": "1"},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel": "0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-0220:19:11","ModuleDescription": " 4-port Gigabit Ethernet Integrated Daughter Card ","PortDescription": "Hardware is ASR1001-IDC-4XGE","PortName":"GigabitEthernet0/2/2","Model": "ASR1001","SoftwarePackage": "(X86_64_LINUX_IOSD-UNIVERSALK9-M)","Speed": "1000","SlotProductId":"ASR1001-4X1GE","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber": "SSI161706V4","ModuleNumber": "2","MediaType": "unknown media type ","OSType": "IOS-XE","PortId": "9679","SlotNumber": "0","ManagementIp": "1.18.8.4","ModuleProductId": "ASR1001-IDC-4XGE","OSVersion": "15.3(2)S1","PortNumber": "2"},{"Connectivity": "10/0/3","HostName": "R8_R4","Util": "0 hr 0.00 min","Idle": "24 hrs 0.00 min","PercentIdle": "100.00","PercentUtil": "0.00","Pass": "0","Fail": "0","NumberOfCancellation": "0","PercentPass": "0.00","PercentFail": "0.00","PercentCancel":"0.00","Generic": "0","Explicit": "0","PercentGeneric": "0.00","PercentExplicit": "0.00","GenericFailed": "0","ExplicitFailed": "0","PercentGenericFailed": "0.00","PercentExplicitFailed": "0.00","DateAdded": "2014-02-02 20:19:11","ModuleDescription": " 4-port Gigabit Ethernet Integrated DaughterCard ","PortDescription": "Hardware is ASR1001-IDC-4XGE","PortName": "GigabitEthernet0/2/3","Model": "ASR1001","SoftwarePackage":"(X86_64_LINUX_IOSD-UNIVERSALK9-M)","Speed": "1000","SlotProductId": "ASR1001-4X1GE","DeviceId": "11984","Manufacturer": "Cisco","ConsoleIp": "172.27.41.160:2006","SerialNumber": "SSI161706V4","ModuleNumber": "2","MediaType": "unknown media type ","OSType": "IOS-XE","PortId": "9680","SlotNumber": "0","ManagementIp": "1.18.8.4","ModuleProductId": "ASR1001-IDC-4XGE","OSVersion": "15.3(2)S1","PortNumber": "3"}], "total": "2684","pages": "135","page": "1"}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			$("#totalMatchesDomain").empty().append(total);            
			
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}

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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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

	
    var url = getURL('STATSummary')+'action=portstats&query='+globalDate+"&domain="+globalDomainContent+'&domain='+globalDomainContent+'&page=1&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view'+globalStatsView;//&sort='+sort+'&orderby='+orderby+'&user='+globalUser+'&filter='+filterVal+"&terminal="+terminal+"&switch="+switch1;
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "74","pages": "4","page": "1","row": [{"Name": "Hardware is ASR1001","Name2": "HardwareisASR1001","NumberOfPorts": "72","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "1728 hrs0.00min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "Hardware is ASR1001-IDC-4XGE","Name2":"HardwareisASR1001IDC4XGE","NumberOfPorts": "8","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "192 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle":"100.00","ActualStartReservation": "2014-2-18","ActualEndReservation": "2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic":"0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"},{"Name": "Hardware is SPA-5X1GE-V2","Name2": "HardwareisSPA5X1GEV2","NumberOfPorts": "85","AverageUtilization": "0.00","AverageDuration": "0 hr 0.00 min","AverageIdle": "24 hrs 0.00 min","AveragePercentIdle": "100.00","TotalUtilization": "0 hr 0.00 min","TotalIdle": "2040 hrs 0.00 min","TotalPercentUtilization": "0.00","TotalPercentIdle": "100.00","ActualStartReservation": "2014-2-18","ActualEndReservation":"2014-2-18","PassCount": "0","Failed": "0","Cancelled": "0","Generic": "0","Explicit": "0","GenericFailed": "0","ExplicitFailed": "0"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			$("#totalMatchesDomain").empty().append(total);            
			
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}

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
			if (globalDeviceType == "Mobile"){
				$("#domain-table0").table( "refresh" );
			}			
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

function changeComponentsUser(globalDomain){
	//StatSelectTable(globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate);
	//globalStatLimit = 20;
	//
	if (globalDeviceType != "Mobile"){
	$('#optionStat').hide();
	$('#showGraphStat').hide();
	$('#GenReStat').hide();
	$('#domain-table0').hide();
	$('#domain-table1').show();
	$('#statSelect').hide();
	$('#viewStatSelect').hide();
	$('#statsViewNew').hide();
	globalViewStatSelect = $('#viewStatSelectU').val();
	var globalDomainContent = globalDomain
	
	}
	if (globalViewStatSelect == 'Detailed'){
		$("#StatsViewNewUser").empty();
		UserDeatiledTable2();
	}else if (globalViewStatSelect == 'Summary'){
		var selects = "<select name='select-native-2' id='statsViewNew2' data-inline='true'>";
		selects = selects+"<option value='Utilization'>Utilization</option>";
		selects = selects+"<option value='Reservation'>Reservation</option></select>";
		$("#StatsViewNewUser").empty().append(selects);
		$("#StatsViewNewUser select").last().addClass('last');
		UserSummaryTable2()
		//console.log(selects);
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

	
    var url = getURL('STATDetailed')+'action=userdetailedview&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby+'&user='+globalUser+"&terminal="+terminal+"&switch="+switch1;

	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = '{"root": {"total": "132","pages": "7","page": "1","row": [{"Id": "594797","Status": "Reserved","LastName": "Mabignay","FirstName": "Kara","MiddleName": "Tan","UserName": "kmmabignay","UserType": "Administrator","Start": "2014-02-18 10:39:49","End": "2014-02-18 12:39:49","Duration": "2 hrs 0.00 min","Domain":"Guaranteed/Expensive/Security/BxB_Domain/TwinPeaks","GroupName": "Default"},{"Id": "594795","Status": "Reserved","LastName": "Mabignay","FirstName":"Kara","MiddleName": "Tan","UserName": "kmmabignay","UserType": "Administrator","Start": "2014-02-18 10:38:16","End": "2014-02-18 12:38:16","Duration": "2 hrs 0.00 min","Domain": "Guaranteed/Expensive/Security/BxB_Domain/TwinPeaks","GroupName": "Default"},{"Id": "594793","Status": "Reserved","LastName": "Mabignay","FirstName": "Kara","MiddleName": "Tan","UserName": "kmmabignay","UserType": "Administrator","Start": "2014-02-18 10:37:19","End":"2014-02-18 12:37:19","Duration": "2 hrs 0.00 min","Domain": "Guaranteed/Expensive/Security/BxB_Domain/TwinPeaks","GroupName": "Default"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			$("#totalMatchesUser").empty().append(total);            
			if(globalDeviceType != "Mobile"){
				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}
	
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
				if (globalDeviceType != "Mobile"){
					html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
				}
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
		//$("#domain-table1").table( "refresh" );
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
					colnum = 5
				}else if(colval == "ConsoleIp"){
					colnum = 6
				}else if(colval == "Manufacturer"){
					colnum = 7
				}else if(colval == "Model"){
					colnum = 8
				}else if(colval == "DeviceType"){
					colnum = 9
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
					colnum = 5
				}else if(colval == "ProductIdentifier"){
					colnum = 6
				}else if(colval == "Description"){
					colnum = 7
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
					colnum = 5
				}else if(colval == "SlotProductId"){
					colnum = 6
				}else if(colval == "ModuleNumber"){
					colnum = 7
				}else if(colval == "ModuleProductId"){
					colnum = 8
				}else if(colval == "ModuleDescription"){
					colnum = 9
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
					colnum = 5
				}else if(colval == "SlotProductId"){
					colnum = 6
				}else if(colval == "ModuleNumber"){
					colnum = 7
				}else if(colval == "ModuleProductId"){
					colnum = 8
				}else if(colval == "PortName"){
					colnum = 9
				}else if(colval == "PortNumber"){
					colnum = 10
				}else if(colval == "MediaType"){
					colnum = 11
				}else if(colval == "Speed"){
					colnum = 12
				}else if(colval == "PortDescription"){
					colnum = 13
				}
			}else if (globalViewStatSelect == 'Summary'){
				if(colval == "HostName"){
					colnum = 2
				}
			}

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
			DeviceDetailedTable2(globalStatSelect,globalViewStatSelect,globalStatsViewNew,globalStatsView,globalDomainContent,globalDate);					
		}else if (globalViewStatSelect == 'Summary'){
			DeviceSummaryTable2();
		}
	}else if (globalStatSelect == 'Slot'){
		if (globalViewStatSelect == 'Detailed'){
			SlotDetailedTable2();
		}else if (globalViewStatSelect == 'Summary'){
			SlotSummaryTable2();
		}
	}else if (globalStatSelect == 'Module'){
		if (globalViewStatSelect == 'Detailed'){
			ModuleDetailedTable2();
		}else if (globalViewStatSelect == 'Summary'){
			ModuleSummaryTable2();
		}
	}else if (globalStatSelect == 'Port'){
		if (globalViewStatSelect == 'Detailed'){
			PortDetailedTable2();
		}else if (globalViewStatSelect == 'Summary'){
			PortSummaryTable2();
		}

	}else{
		UserDeatiledTable2();
		}
	$('#domain-table0').attr('style','display:all');
	$('#domain-table0-popup').attr('style','display:all');

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

function UserSummaryTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	$('#optionStat').hide();
	$('#showGraphStat').hide();
	$('#GenReStat').hide();
    var url = getURL('STATDetailed')+'action=usersummaryview&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Summary&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby+'&user='+globalUser+"&terminal="+terminal+"&switch="+switch1;

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
			if(globalDeviceType != "Mobile"){
				var userD = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
				userD = userD+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
			}else{
				var userD = "<thead id=rmResStat><tr class='ui-bar-d'>";
			}
	
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
				if (globalDeviceType != "Mobile"){
					userD += "<th><input type='checkbox' id='val"+row[a].getAttribute('UserName')+"'/></th>";	
				}
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
		$("#statSelect option").empty();
		$("#domain-table0").empty();
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
	var statId = [];
	var parser = new DOMParser();
	for (var d=0; d<$('.trStat').length; d++){		
		var clas = $('.trStat')[d].getAttribute('class');
		var ids = $('.trStat')[d].getAttribute('id');
		if (clas == 'trStat highlight'){
//			checkId	+= ','+ids;
			getDeviceHostName(ids);
			statId.push(ids);
		}
	}
	return statId;
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

function getDeviceHostName(checkId2){
	console.log(checkId2);
	var view;
	var view2;
	var view = getView();	
	view2 = globalViewStatSelect;
 	var id = checkId2 ;
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
    var url = getURL('STAT2')+'action=getDevHost&query=id='+id+'^view='+view+'^view2='+view2;
	
    $.ajax({
        url: url,
        dataType: 'text',
        async: false,
        success: function(data){
            retval = data;
			
        }
    });
//	console.log(data+'plsssssss');
    return retval;

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


function createGraph(action, graph2){
//	var id = '';
	var rList = [];
	var checkId2 = highLightId();
	if (checkId2.length == 1){
		var id = checkId2[0];
	}else{
		var id = '';
		for (var a=0; a<checkId2.length; a++){
			id += checkId2[a]+',';
			var host = getDeviceHostName();
			rList.push(host);
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
	//id = '11984,11992,12001';
	var type = $("#statsView").val();
	var id = highLightId();
    var cgiurl = getURL('STATDetailed')+'action='+action+'&id='+id+'&start=2014-02-1&end=2014-02-28&terminal='+globalTerminal+'&switch='+globalSwitch;
//	var graph2 = typeGraph();    
//    var cgiurl = 'httpss://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedgraphtest&id=12066&start=2014-02-18&end=2014-02-18&terminal=no&switch=no';
    $.ajax({
        url: cgiurl,
        dataType: 'html',
//        async: false,
        success: function(data){
            retval = $.trim(data);
			if (graph2 == 'createLine' || graph2 == 'Line'){
				createLineGraph(data,type);
			}else if (graph2 == 'createPie' || graph2 == 'Pie' ){
				createPieGraph(data,type);
			}else if (graph2 == 'createBar'){
				createLineBar(data,type);
			}else{
				createLineGraph(data,type);
			}
        }
    });
	
//httpss://172.24.1.11/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedgraphtest&id=11984&start=2014-02-15&end=2014-02-15&terminal=no&switch=no
/*
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
*/
}
function typeGraph(graph){
	return graph
}

function titleGraph(){
    var title2 = "";
    var view =$('#viewStatSelect').val();
    var dte = globalDate.split(',');
    if ($('#statsView').val() != "Custom" && $('#statsView').val() != "Quarter" && $('#statsView').val() != "Month") {
        title2 = dte[0];

    } else if ($('#statsView').val() == "Month") {
        title2 = globalDate ;
    } else if ($('#statsView').val() == "Quarter") {
        title2 = globalDate;
    } else {
        title2 = globalDate;
    }
    return title2

}


function gradientPie(){
    if(gradientCtr ==1){
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
    }
}

var gradientCtr=0;
function createPieGraph(data,type) {
	gradientCtr++;
	gradientPie();
    if (type == "Day") {
        type = "Daily";
    } else if (type != "Annual") {
        type += "ly";
    }

    var title2 = titleGraph();

    var parser = new DOMParser();
    var xmlDoc;
    xmlDoc = parser.parseFromString(data ,"text/xml");
    var data2 = xmlDoc.getElementsByTagName("row");
    var hostname="";
    var passed = "";
    var failed = "";
    var cancelled="";
    var tpass=0;
    var tcancel=0;
    var tfail=0;
    var ctr =0;
    var enabledVal = true;
    var exportVal = true;
    for(var x = 0; x < data2.length; x++){
        ctr++;
        hostname = data2[x].getAttribute('Name');
        passed = data2[x].getAttribute('Pass');
        cancelled = data2[x].getAttribute('NumberOfCancellation');
        failed = data2[x].getAttribute('Failed');
        tcancel = tcancel + parseFloat(cancelled);
        tpass = tpass + parseFloat(passed);
        tfail = tfail + parseFloat(failed);

    }
	if(data2.length==0){
		var pieLeg = false;
		var serData = [];
	}else{
		var pieLeg = true;
		var serData = [{ name:'Completely Utilized', y: tpass, sliced:true, selected:true},['Failed',tfail],['Cancellation',   tcancel]];
	}
    if(tcancel == 0 && tpass == 0 && tfail == 0 ){
        //this variable set to false to hide the context menu of the grpah and labels of pie chart
        exportVal = false;
        enabledVal= false;
    }
    var uberTranslate = Highcharts.seriesTypes.pie.prototype.translate;
    Highcharts.seriesTypes.pie.prototype.translate = function() {
        uberTranslate.apply(this, arguments);
        var points = this.points,
            i = points.length;
        while (i--) {
            points[i].percentage = Highcharts.numberFormat(points[i].percentage, 2);
        }
    };

	
    $('#graphDataContainer').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
		credits: {
	    	enabled: false,
            href : 'https://www.narrasystems.com',
            text: 'NarraSystems'
	    },
        exporting: {
            enabled: exportVal
        },
        title: {
            text: type+' Reservation for '+hostname
        },
        subtitle: {
            text: 'Reservation Count: '+ctr+'<br><b>'+title2+'</b>'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1,
			backgroundColor: {
                linearGradient: [0, 0, 0, 60],
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#E0E0E0']
                ]
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: enabledVal,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        if(this.y != 0){
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %' +' ('+this.y+')';
                        }
                    }
                },
                showInLegend: pieLeg
            }
        },
        series: [{
			type: 'pie',
            name: hostname,
//            colors: ['#4572A7','#89A54E','#92A8CD'],
            data: serData
        }]
    });
}

function createLineGraph(data){	
	var title2 = titleGraph();
    var view =$('#viewStatSelect').val();

    var parser = new DOMParser();
    var xmlDoc;
    xmlDoc = parser.parseFromString(data ,"text/xml");
    var data2 = xmlDoc.getElementsByTagName("row");
    var data3 = xmlDoc.getElementsByTagName('Utilization');
    var seriesDATA="";
    var utilNew = "";
    var util =0;
    var ctr =0;
    var split;
    var TF;
    var maxArr=[];
    var exportVal = 'true';
    var dataCHART = '['+retval+']';

	for(var y = 0; y < data3.length; y++){
        var TotalMax = data3[y].getAttribute('TotalReservation');
        maxArr.push(TotalMax);

    }
    var MaxReservation = Math.max.apply(Math, maxArr);

    if(data2.length==0){
	 exportVal = false;
    }
	for(var x = 0; x < data2.length; x++){
        ctr++;
        var hostname = data2[x].getAttribute('Name');
        split = hostname.split(" ");
        var utilNew = parseFloat(data2[x].getAttribute('Util'))/60;
        var RN = parseFloat(data2[x].getAttribute('ReservationNumber'));
        var idle =  data2[x].getAttribute('Idle');
        if(hostname==""){
            hostname="Unknown";
        }
        util = utilNew+','+RN;

        seriesDATA +='{'+'"name"'+':'+'"'+hostname+'"'+','+'"data"'+':'+'"'+util+'"'+'},';
    }
	if(MaxReservation<50){
        TF = '';
        var maxVal = MaxReservation;
    }else if(MaxReservation < 1000){
        TF = 'true';
        var maxVal =  50;
    }else{
        TF = 'true';
        var maxVal =  100;
    }

    var val = seriesDATA.substring(0,seriesDATA.length-1);
    var dataCHART = '['+val+']';


    //options variable contains the style and data for rendering graph in highcharts
    var options = {
        chart: {
            renderTo: 'graphDataContainer',
            alignTicks: false,
            backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
            borderWidth: 2,
            plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            plotShadow: true,
            plotBorderWidth: 1
        },
		credits: {
	    	enabled: false,
            href : 'https://www.narrasystems.com',
            text: 'NarraSystems'
	    },
		colors: [
           '#2f7ed8',
           '#0d233a',
           '#8bbc21',
           '#910000',
           '#1aadce',
           '#492970',
           '#f28f43',
           '#77a1e5',
           '#c42525',
           '#a6c96a'
        ],
        exporting: {
            enabled: exportVal
        },
        title: {
            text: 'Reservation Duration',
            style: {
                color: '#000',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        subtitle: {
            text: '<b>'+title2+'</b>',
            style: {
                color: '#666666',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        xAxis: {
		//min:0,
            max: maxVal,
            gridLineWidth: 1,
            allowDecimals: false,
            lineColor: '#000',
            tickColor: '#000',
            labels: {
                style: {
                    color: '#000',
                    font: '11px Trebuchet MS, Verdana, sans-serif'
                }
            },
            title: {
                text: 'Reservation Number',
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
       yAxis: {
///			type: 'datetime',
            minorTickInterval: 'auto',
            allowDecimals: false,
//            min: 0,
            lineColor: '#000',
//          endOnTick: false,
    		lineWidth: 1,
            tickWidth: 1,
            tickColor: '#000',
            labels: {
                formatter: function(){
                         if(this.value < 2){
                            return this.value+' hr'
                        }else{

                            return this.value+' hrs'
                        }
                },
                style: {
                    color: '#000',
                    font: '11px Trebuchet MS, Verdana, sans-serif'
                }
            },
            title: {
                text: 'Reservation(Hours)',
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                }
           }

        },
        plotOptions: {
            series:{
                pointStart: 1,
            }
        },
        scrollbar: {
            enabled: TF
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: 'black'

            },
            itemHoverStyle: {
                color: '#039'
            },
            itemHiddenStyle: {
                color: 'gray'
            }
        },

        tooltip: {

            formatter: function () {
                return this.series.name + '<br />Reservation Number:  ' + this.x +'<br/>Reservation Time: <b>'+ this.y.toFixed(2)+'hr(s)</b>';

            },
			backgroundColor: {
                linearGradient: [0, 0, 0, 60],
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#E0E0E0']
                ]
            }
        },
        labels: {
			style: {
                    color: '#99b'
            }
        },
        series: []
    };
    //convert xml file to JSON
    data = JSON.parse(dataCHART);
    var names = [];
    //stores data from the query into series data of chart.
    $.each(data, function (i, ligne) {
        var ind = names.indexOf(ligne.name),
            splited = ligne.data.split(','),
            x = parseFloat(splited[0]);
            y = parseFloat(splited[1]);
        if (ind == -1) {
            ind = names.push(ligne.name) - 1;
            options.series.push({
                data: [],
                name: ligne.name
            });
        }
        if(!isNaN(x) && !isNaN(y)){
            options.series[ind].data.push([y,x]);
        }
    });
    //rendering the options to graph
    var chart = new Highcharts.Chart(options);

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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
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
	//console.log(html);
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
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
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
//				moduleD  += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
//				PortD += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";
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
		if (globalDeviceType != "Mobile"){
			html += "<th><input type='checkbox' id='val"+jsonData.root.row[a].DeviceId+"'/></th>";	
		}
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
 #######################################################################
 #
 #  FUNCTION NAME : checkAllStatTable
 #  AUTHOR        : Maureen Daelo
 #  DATE          : February 20, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : Check all stat checkbox
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function checkAllStatTable(){
	if($('#statSelectAll').is (':checked')){
		$(".trStat").each(function(){
			var val = $(this).attr('id');	
//			if($.inArray(val, globalAccessId) == -1){
		//		globalAccessId.push(val);
		//		console.log('Global: ',globalAccessId);	
				if(globalDeviceType != "Mobile"){
					$('#val'+val).attr("checked",true);
					$(this).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
//			}
		});
	}else{
		$(".trStat").each(function(){
			var val = $(this).attr('id');
//	var pos = globalAccessId.indexOf(val);
//			globalAccessId.splice(pos,1);
//			console.log('Global: ',globalAccessId);	
			if(globalDeviceType != "Mobile"){
				$('#val'+val).attr("checked",false);
				$(this).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		});
	}
	changeComponents();
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : optionPopUpClose
 #  AUTHOR        : Maureen Daelo
 #  DATE          : February 20, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   :  show the option to include Terminal/Switch to the main table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function optionPopUpClose(){
//	highLightId();
	if ($('#StatTerminal').is(':checked')){
		globalTerminal = 'yes';
	}else{
		globalTerminal = 'no';
	}	

	if ($('#StatSwitch').is(':checked')){
		globalSwitch = 'yes'
	}else{
		globalSwitch = 'no'
	}
	//console.log(globalSwitch+" globalSwitch");
	$( "#StatisticOption" ).dialog('close');
	changeComponents();
}

function optionPopUpClose2(){
//	console.log(globalTerminal+" globalTerminal");
	//console.log(globalSwitch+" globalSwitch");
	$( "#StatisticOption" ).dialog('close');
	$( "#CloseGraph" ).dialog('close');
	changeComponents();
}
function graphPopUpClose(){
	$( "#StatShowGraph" ).dialog('close');
	changeComponents();
}
function graphPopUpClose(){
	$( "#StatShowGraph" ).dialog('close');
	changeComponents();
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : optionPopUp
 #  AUTHOR        : Maureen Daelo
 #  DATE          : February 20, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : Terminal Switch popUp
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function optionPopUp(){
	//console.log("option");
	$( "#StatisticOption" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto"
	});
		
	if (globalStatSelect == 'Device' || globalStatSelect == 'Port'){	
		$( "#StatisticOption" ).empty().load('pages/Stats/statOption.html',function(){

		//console.log("loob");
			setTimeout(function(){
			},1000);
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});
		});
	}else if (globalStatSelect == 'Slot' || globalStatSelect == 'Module'){
		$( "#StatisticOption" ).empty().load('pages/Stats/statOption2.html',function(){

		//console.log("loob");
			setTimeout(function(){
			},1000);
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});
		});
	}
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



/*
 *
 *  FUNCTION NAME : selectionUser
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 24, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function selectionUser(){

//	var html = "<tr><td><select name='select-native-2' id='statSelect'";
//	html = html+" data-mini='true' data-inline='true'";
//	html = html+" onchange='changeComponents(this.val);'";
//	html = html+" class='rDomainTable'>";
//	html = html+"<option value='Device'>Device</option>";
//	html = html+"<option value='Slot'>Slot</option>";
//	html = html+"<option value='Module'>Module</option>";
//	html = html+"<option value='Port'>Port</option>";
//	html = html+"</select></td>
	if (globalDeviceType != "Mobile"){   
		globalStatSelect = $('#statSelect').val();
		globalViewStatSelect = $('#viewStatSelect').val();
		globalStatsViewNew = $('#statsViewNew').val();
	//	$('#liReservation-table0').hide();
	$('#domain-table0').show();
	}
	var html = "<td><select name='select-native-2'";
	html = html+" id='viewStatSelectU' data-mini='true'";
	html = html+" data-inline='true' onchange='selectionUser2(this.val);'>";
	html = html+" <option value='Detailed'>Detailed</option>";
	html = html+"<option value='Summary'>Summary</option>";
	html = html+"</select></td><td id='userSelect'>";
//	html = html+" id='statsViewNewU' data-inline='true'";
//	html = html+" onchange='changeComponents(this.val);'>";
//	html = html+"<option value='Utilization'>Utilization</option>";
//	html = html+"<option value='Reservation'>Reservation</option>";
//	html = html+"</select></td><td><select ";
	html = html+"<td><select data-inline='true' id='statsViewU' ";
	html = html+"onchange='statsViewDate(this.val);'>";
	html = html+"<option value='Daily'>Daily</option>";
	html = html+"<option value='Weekly'>Weekly</option>";
	html = html+"<option value='Monthly'>Monthly</option>";
	html = html+"<option value='Quarterly'>Quarterly</option>";
	html = html+"<option value='Annually'>Annually</option>";
	html = html+"<option value='Custom'>Custom</option>";
	html = html+"</select></td><td id='statsView2U'></td>";
	html = html+"<td id='statsView3U'></td>";

	$('#selection-domain').empty().append(html);	
	globalViewStatSelect = $('#viewStatSelectU').val();
	if (globalViewStatSelect == 'Detailed'){
		UserDeatiledTable2();
	}else{
		selectionUser();		
	}	
//	changeComponentsUser()
//	changeComponents();
//	if ($('#viewStatSelectU'))
//$("#statsView option:selected").val();

}




/*
 *
 *  FUNCTION NAME : selectionUser2
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 24, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

/*
 *
 *  FUNCTION NAME : SlotDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize RackTable in detailed view
 *  PARAMETERS    : 
 *
 */
function RackDetailedTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = getURL('STATDetailed')+'action=slotdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
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
			html = html+"<td>Number</td>";
			html = html+"<td>ProductId</td>";
			html = html+"<td>Description</td>";

			var filter = "<option value=DeviceID></option>";
			filter = filter+"<option value=DeviceID>DeviceID</option>";
			filter = filter+"<option value=HostName>HostName</option>";
			filter = filter+"<option value=Number>Number</option>";
			filter = filter+"<option value=ProductIdentifier>ProductIdentifier</option>";
			filter = filter+"<option value=Description>Description</option>";
			html = TableHeader(html);	
			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = RackDetailedTableContent(jsonData,html);

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
 *  FUNCTION NAME : RackDetailedTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function RackDetailedTableContent(jsonData,html){


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
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";
	
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
 *  FUNCTION NAME : subChannelDetailedTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 3, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize PortTable in detailed view
 *  PARAMETERS    : 
 *
 */

function SubChannelDetailedTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = getURL('STATDetailed')+'action=portdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;//+"&terminal="+terminal+"&switch="+switch1+"&filter="+filterVal+"&sort="+sort+"&orderby="+orderby;
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
			

			html = html+"<th data-priority='2'>ID</th>";
			html = html+"<th data-priority='2'>Date Added</th>";
			html = html+"<th data-priority='1'>HostName</th>";
			html = html+"<th data-priority='2'>Rack Number</th>";
			html = html+"<th data-priority='1'>Rack ProductId</th>";
			html = html+"<th data-priority='1'>Slot Number</th>";
			html = html+"<th data-priority='2'>Slot Product Id</th>";
			html = html+"<th data-priority='1'>Module Number</th>";
			html = html+"<th data-priority='2'>Module Product Id</th>";
			html = html+"<th data-priority='1'>PortName</th>";
			html = html+"<th data-priority='2'>Port Number</th>";
			html = html+"<th data-priority='1'>Port Media Type</th>";
			html = html+"<th data-priority='2'>Port Speed</th>";
			html = html+"<th data-priority='1'>Port Description</th>";
			html = html+"<th data-priority='2'>Port Partner Device</th>";

			html = html+"<th data-priority='1'>SubChannelName</th>";
			html = html+"<th data-priority='2'>SubChannel Number</th>";
			html = html+"<th data-priority='1'>SubChannel MediaType</th>";
			html = html+"<th data-priority='2'>SubChannel Speed</th>";
			html = html+"<th data-priority='1'>SubChannel Description</th>";
			html = html+"<th data-priority='2'>SubChannel Partner Device</th>";
		
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
			if (globalDeviceType != "Mobile"){
					
				$("#domain-table0").table( "refresh" );
			}
 
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

function SubChannelDetailedTableContent(jsonData,html){

	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].DeviceId+"'>";
//				PortD += "<tr class='trStat'>";
		html += "<td>"+jsonData.root.row[a].DeviceId+"</td>";
		html += "<td>"+jsonData.root.row[a].DateAdded+"</td>";
		html += "<td>"+jsonData.root.row[a].HostName+"</td>";
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";
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

		html += "<td> </td>";
		html += "<td> </td>";
		html += "<td> </td>";
		html += "<td> </td>";
		html += "<td> </td>";
		html += "<td> </td>";
	
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

function RackSummaryTable(){

//	if (globalStatsView == 'Daily'){
//		globalDate = globalDate+","+globalDate;
//	}

	
    var url = "getURL('STATSummary')"+'action=esprpstats&query='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page=1&view='+globalStatsView;
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
			html = html+"<th>Number of Rack</th>";
			html = TableHeader(html);

			html = html+"</tr></thead><tbody id='tbodyDevice'><tr>";
			html = RackSummaryTableContent(jsonData,html);
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
 *  FUNCTION NAME : RackSummaryTableContent
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function RackSummaryTableContent(jsonData,html){

	for (a=0; a< jsonData.root.row.length; a++){
		html += "<tr class='trStat' id='"+jsonData.root.row[a].Name+"'>";
	//	SlotS += "<tr class='trStat'>";
		html += "<td>N/A</td>";
		html += "<td>N/A</td>";

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

function selectionUser2(){

	var view = $('#viewStatSelectU').val();
	var html2 = '';
	if (view == 'Detailed'){
		$('#userSelect').empty();
	}else{
		html2 = html2+"<select name='select-native-2'";
		html2 = html2+" id='statsViewNewU' data-inline='true'";
		html2 = html2+" onchange='changeComponents(this.val);'>";
		html2 = html2+"<option value='Utilization'>Utilization</option>";
		html2 = html2+"<option value='Reservation'>Reservation</option>";
		$('#userSelect').append(html2);		
	}
	globalStatsViewNew = $('#statsViewNewU').val();

}


/*
 #######################################################################
 #
 #  FUNCTION NAME : optionPopUp2
 #  AUTHOR        : Maureen Daelo
 #  DATE          : February 20, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : Terminal Switch popUp
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function optionPopUp2(graph2){
	var checkId2 = highLightId();
	if (checkId2.length == 0){
		alert(" No Selected Item  ")
	}else{
		$( "#StatShowGraph" ).dialog({
			modal: true,
			autoResize:true,
			width: "85%"
		});
		createGraph('',graph2);
		$( "#StatShowGraph" ).empty().load('pages/Stats/statShowGraph.html',function(){
		
//		$("#StatShowGraph").empty().append(createGraph());
//			$('#domain-table0 > table').empty().append(html);
  //          $("#domain-table0").table("refresh");
			//console.log("loob");
			setTimeout(function(){
			},1000);
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});
		});
	}	
}



/*
 #######################################################################
 #
 #  FUNCTION NAME : backToDomain
 #  AUTHOR        : Maureen Daelo
 #  DATE          : March 1, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : this function is for cancel or close button to back to the Domain Main page/table in Mobile for popup
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function backToDomain(){
//	getUlDomains();	
//	changeComponents();
	$.mobile.changePage( "pages/Stats/StatisticsDomains.html", {
		transition: "flow",
		reverse: false,
		changeHash: true
	});

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : backToDomain2
 #  AUTHOR        : Maureen Daelo
 #  DATE          : March 1, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : this function is for cancel or close button to back to the Domain Main page/table in Mobile for other pages
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function backToDomain2(){
//	getUlDomains();	
//	changeComponents();
	$.mobile.changePage( "StatisticsDomains.html", {
		transition: "flow",
		reverse: false,
		changeHash: true
	});

}


/*
 #######################################################################
 #
 #  FUNCTION NAME : generateReport
 #  AUTHOR        : Maureen Daelo
 #  DATE          : March 1, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function generateReport(){
		var attribute = '';
		var id='';
		var act = '';
	$('#pdfdevice').each(function(){
		if($(this).is(':checked')){
			fileview = 'pdf';
		}else{
			fileview = 'csv';
		}
	}); 
	if (globalStatSelect == 'Device'){
		if (globalViewStatSelect == 'Detailed'){
			attribute = generateReportDeviceDetailed();
			//console.log(attribute)
			id = highLightId();
		//	console.log(attribute+"  "+id);
			if (fileview = 'pdf'){
				act = 'devicepdf';
			}else{
				act = 'deicecsv'
			}
		}else if (globalViewStatSelect == 'Summary'){
			DeviceSummaryTable();
		}
	}else if (globalStatSelect == 'Rack'){
		if (globalViewStatSelect == 'Detailed'){
			RackDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
		}
	}else if (globalStatSelect == 'Slot'){
		if (globalViewStatSelect == 'Detailed'){
			if (fileview = 'pdf'){
				act = 'slotpdf';
			}else{
				act = 'slotcsv'
			}
			attribute = generateReportSlotDetailed();
			id = highLightId();
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
	}else if (globalStatSelect == 'SubChannel'){
		if (globalViewStatSelect == 'Detailed'){
			SubChannelDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			SubChannelSummaryTable();
		}

	}
	//console.log(fileview);
	if (fileview != 'pdf'){
		var file = getURL("STATDetailed")+'action='+act+'&query='+'&date2='+globalDate+'&view='+globalStatsView+'&domain='+globalDomainContent+'&attribute='+attribute+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&id='+id+'&table='+globalStatsViewNew;
	}else if (fileview == 'pdf'){
       var file = getURL('STAT')+'action='+act+'&query='+'^date2='+globalDate+'^view='+globalStatsView+'^domain='+globalDomainContent+'^attribute='+attribute+'^terminal='+globalTerminal+'^switch='+globalSwitch+'^filetype='+fileview+'^id='+id+'^table='+globalStatsViewNew;
	 }
//ttps:iAdmin.fcgi?action=devicecsv&date2=2014-03-03,2014-03-03&view=Day&filter=&page=1&limit=20&user=marloagapay&domain=Any&attribute=DateAdded,HostName,Manufacturer,Model,Idle,IdlePercent,ReservationPercent&terminal=no&switch=no&filetype=csv&id=11984&realdate=Mar-03-2014
//	var url = getURL("STATDetailed")+'action='+act+'&id='+id+'&view=Day&date='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'attribute'+attribute;
	
	//console.log(file);
	changeComponents();
	statId = [];
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : generateReportDeviceDetailed
 #  AUTHOR        : Maureen Daelo
 #  DATE          : March 3, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function generateReportDeviceDetailed(){
	var attr = new Array()
	attr.push('DeviceDefaultDeviceId,DeviceId');
	attr.push('DeviceDefaultDateAdded,DateAdded');
	attr.push('DeviceDefaultHostName,HostName');
	attr.push('DeviceDefaultManufacturer,Manufacturer');
	attr.push('DeviceDefaultModel,Model');
	attr.push('ExpandedManagementIp,ManagementIp');
	attr.push('ExpandedConsoleIp,ConsoleIp');
	attr.push('ExpandedDeviceType,DeviceType');
	attr.push('DeviceDefaultIdle,Idle');
	attr.push('DeviceDefaultReservation,Reservation');
	attr.push('DeviceDefaultIdlePer,IdlePercent');
	attr.push('DeviceDefaultReservationPer,ReservationPercent');
	attr.push('DeviceDefaultNoScheduled,NoOfScheduled');
	attr.push('DeviceDefaultGeneric,Generic');
	attr.push('DeviceDefaultExplicitPer,Explicit');
	attr.push('DeviceDefaultNoRescheduled,NoOfReScheduled');
	attr.push('DeviceDefaultGenericReScheduled,GenericReScheduled');
	attr.push('DeviceDefaultExplicitReScheduled,ExplicitReScheduled');
	attr.push('DeviceDefaultCancelled,Cancelled');
	attr.push('DeviceDefaultScheduled,ScheduledPercent');
	attr.push('DeviceDefaultGenericScheduledPer,GenericScheduledPercent');
	attr.push('DeviceDefaultExplicitScheduledPer,ExplicitScheduledPercent');
	attr.push('DeviceDefaultRescheduledPer,ReScheduledPercent');
	attr.push('DeviceDefaultGenericReScheduledPer,GenericReScheduledPercent');
	attr.push('DeviceDefaultExplicitReScheduledPer,ExplicitReScheduledPercent');
	attr.push('DeviceDefaultCancelledPer,CancelledPercent');
	attr.push('ExpandedOSVersion,OSVersion');
	attr.push('ExpandedSystemMem,SystemMemory');

    var attrArray = new Array();
		
	for (var a=0; a<attr.length; a++){
		var attrib = attr[a].split(",")[0];
		var attribute = attr[a].split(",")[1];
		//console.log(attribute+",     "+attrib);
		$('#'+attrib).each(function() {
			if($(this).is(':checked')){
				attrArray.push(attribute);
			}
		});
	}
//	console.log(attrArray);
	return attrArray
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : HideShowUtilizatioReservation
 #  AUTHOR        : Maureen Daelo
 #  DATE          : March 1, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : Hide and show checkbox
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function HideShowUtilizatioReservation(){

	if (globalStatSelect == 'Device'){
		$('#DefaultDeviceChoices').hide();
		if (globalViewStatSelect == 'Detailed'){
			if (globalStatsViewNew == 'Utilization' ){
				$('#DeviceDetailed1').show();
				$('#DeviceDetailed2').hide();
				$('#DeviceDetailed3').hide();
				$('#DeviceDetailed4').hide();
				//console.log('generateReport');
			}else if (globalStatsViewNew == 'Reservation'){
				$('#DeviceDetailed1').hide();
				$('#DeviceDetailed2').show();
				$('#DeviceDetailed3').show();
				$('#DeviceDetailed4').show();
			}
		}else if (globalViewStatSelect == 'Summary'){
			$('#DefaultDeviceChoices').hide();

			DeviceSummaryTable();
		}
	}else if (globalStatSelect == 'Rack'){
		$('#DefaultDeviceChoices').hide();
		if (globalViewStatSelect == 'Detailed'){
			RackDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
		}
	}else if (globalStatSelect == 'Slot'){
		$('#DefaultDeviceChoices').hide();
		if (globalViewStatSelect == 'Detailed'){
			if (globalStatsViewNew == 'Utilization' ){
				$('#SlotDetailed1').show();
				$('#SlotDetailed2').hide();
				$('#SlotDetailed3').hide();
				$('#SlotDetailed4').hide();
				$('#SlotDetailed5').show();
			}else if (globalStatsViewNew == 'Reservation'){
				$('#SlotDetailed1').hide();
				$('#SlotDetailed2').show();
				$('#SlotDetailed3').show();
				$('#SlotDetailed4').show();
				$('#SlotDetailed5').show();
			}
		}else if (globalViewStatSelect == 'Summary'){
			SlotSummaryTable();
		}
	}else if (globalStatSelect == 'Module'){
		$('#DefaultDeviceChoices').hide();
 	if (globalViewStatSelect == 'Detailed'){
			ModuleDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			ModuleSummaryTable();
		}
	}else if (globalStatSelect == 'Port'){
		$('#DefaultDeviceChoices').hide();
		if (globalViewStatSelect == 'Detailed'){
			PortDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			PortSummaryTable();
		}
	}else if (globalStatSelect == 'SubChannel'){
		$('#DefaultDeviceChoices').hide();
		if (globalViewStatSelect == 'Detailed'){
			SubChannelDetailedTable();
		}else if (globalViewStatSelect == 'Summary'){
			SubChannelSummaryTable();
		}

	}

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : generateReportSlotDetailed
 #  AUTHOR        : Maureen Daelo
 #  DATE          : March 3, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function generateReportSlotDetailed(){
	var attr = new Array()
	attr.push('SlotDefaultDeviceId,DeviceId');
	attr.push('SlotDefaultDateAdded,DateAdded');
	attr.push('SlotDefaultHostName,HostName');
	attr.push('SlotDefaultNumber,Number');
	attr.push('SlotDefaultProductId,ProductId');
	attr.push('SlotDefaultDescription,Description');
	attr.push('SlotDefaultIdle,Idle');
	attr.push('SlotDefaultReservation,Reservation');
	attr.push('SlotDefaultIdlePer,IdlePercent');
	attr.push('SlotDefaultReservationPer,ReservationPercent');
	attr.push('SlotDefaultNoScheduled,NoOfScheduled');
	attr.push('ModuleDefaultGeneric,Generic');
	attr.push('ModuleDefaultExplicit,Explicit');
	attr.push('ModuleDefaultNoRescheduled,NoOfReScheduled');
	attr.push('ModuleDefaultGenericReScheduled,GenericReScheduled');
	attr.push('ModuleDefaultExplicitReScheduled,ExplicitReScheduled');
	attr.push('ModuleDefaultCancelled,Cancelled');
	attr.push('ModuleDefaultScheduled,ScheduledPercent');
	attr.push('ModuleDefaultGenericScheduledPer,GenericScheduledPercent');
	attr.push('ModuleDefaultExplicitScheduledPer,ExplicitScheduledPercent');
	attr.push('ModuleDefaultRescheduledPer,ReScheduledPercent');
	attr.push('ModuleDefaultGenericReScheduledPer,GenericReScheduledPercent');
	attr.push('ModuleDefaultExplicitReScheduledPer,ExplicitReScheduledPercent');
	attr.push('ModuleDefaultCancelledPer,CancelledPercent');

    var attrArray = new Array();
	for (var a=0; a<attr.length; a++){
		var attrib = attr[a].split(",")[0];
		var attribute = attr[a].split(",")[1];
		$('#'+attrib).each(function() {
			if($(this).is(':checked')){
				attrArray.push(attribute);
			}
		});
	}
	//console.log(attrArray)
	return attrArray
}
/*
 *
 *  FUNCTION NAME : ReservationReservationTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 1, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize ReservationTable in Reservation treeview
 *  PARAMETERS    : 
 *
 */
function ReservationReservationTable2(){
//	getUlDomains();
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?action=reservationstat&query=`view=daily`date=2014-02-24`limit=10`page=1";
	$.ajax({
        url: url,
		datatype: 'html',
        success: function(data) {
//				data = '{"root": {"page": "1","pages": "3","total": "24","row": [{"ID": "1","Date": "2014-02-24","Hour": "00:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "2","Date": "2014-02-24","Hour": "01:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "3","Date":"2014-02-24","Hour": "02:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "4","Date": "2014-02-24","Hour": "03:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "5","Date": "2014-02-24","Hour": "04:00:00","API": "0","Titan": "0","Topo":"0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "6","Date": "2014-02-24","Hour": "05:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "7","Date": "2014-02-24","Hour": "06:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "8","Date": "2014-02-24","Hour": "07:00:00","API": "0","Titan": "0","Topo":"0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "9","Date": "2014-02-24","Hour": "08:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "10","Date": "2014-02-24","Hour": "09:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
//			statselectlimit(pages);
//			$("#totalmatchesdomain").empty().append(total);            
/*			var html = "<thead>";
			html = html+"<tr class='ui-bar-d header tableRM' ";
			html = html+"style='border-radius:5px; alight:center;'>";
			html = html+'<th>Reservation ID</th>';
			html = html+'<th>Reservation Date</th>';
			html = html+'<th data-priority="2">Total No. of Reservation</th>';
			html = html+'<th data-priority="3">Total No. of Devices</th>';
			html = html+'<th data-priority="3">API</th>';
			html = html+'<th data-priority="4">Titan</th>';
			html = html+'<th data-priority="5">Topo</th>';
			html = html+'<th data-priority="6">Config Editor</th>';
			html = html+'<th data-priority="6">Reserved</th>';
			html = html+'<th data-priority="6">Re-Scheduled</th>';
			html = html+'<th data-priority="6">Failed</th></tr></thead>';
			html = html+'<tbody>';*/
			var html = '';
			for (var a=0; a< jsonData.root.row.length; a++){
				html += "<tr style='text-align:center'>"
				html += "<td>"+jsonData.root.row[a].ID+"</td>"
				html += "<td>"+jsonData.root.row[a].Date+"</td>"
				html += "<td>"+jsonData.root.row[a].Hour+"</td>"
				html += "<td>"+jsonData.root.row[a].TotalNumberOfReservation+"</td>"
				html += "<td>"+jsonData.root.row[a].TotalNumberOfDevices+"</td>"
				html += "<td>"+jsonData.root.row[a].API+"</td>"
				html += "<td>"+jsonData.root.row[a].Titan+"</td>"
				html += "<td>"+jsonData.root.row[a].Topo+"</td>"
				html += "<td>"+jsonData.root.row[a].ConfigEditor+"</td>"
				html += "<td>"+jsonData.root.row[a].Reserved+"</td>"
				html += "<td>"+jsonData.root.row[a].Rescheduled+"</td>"
				html += "</tr>"
			}
//			html = devicedetailedtablecontent(jsondata,html);
			html = html+"</tbody>";
//			$("#filterstat").empty().append(filter);            
//			$("#filterstat option").last().addclass('last');
//			$("#DeviceReservation").empty().append(html);            
//			$("#DeviceReservation tbody").last().addclass('last');
//			$("#usersAdmin-table").table("refresh");
//			$('#liReservation-table0').empty();
			$('#liReservation-table0 tbody').empty().append(html);
			if(globalDeviceType != "Mobile"){
			}else{
	            $("#liReservation-table0").table("refresh");
			}
		}
	});

	$('#liReservation-table0').show()
	$('#liReservation-table1').hide()
	$('#liReservation-table2').hide()

}

/*
 *
 *  FUNCTION NAME : ReservationDeviceTable
 *  AUTHOR        : Maureen Daelo
 *  DATE          : February 24, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize DeviceTable in Reservation treeview
 *  PARAMETERS    : 
 *
 */
function ReservationDeviceTable(){
//	getUlDomains();
	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?action=devicetable&query=`view=daily`date=2014-02-24`filter=undefined`limit=10`page=1';
	$.ajax({
        url: url,
		datatype: 'html',
        success: function(data) {
			data = '{"root": {"page": "1","pages": "12","total": "120","row": [{"Model": "No Reservation on Model","Count": "0","Date": "2014-02-24","Hour": "00:00:00","Hostname": "","User": ""},{"Model": "No Reservation on RP","Count": "0","Date": "2014-02-24","Hour": "00:00:00","Hostname": "","User": ""},{"Model": "No Reservation on ESP","Count": "0","Date": "2014-02-24","Hour": "00:00:00","Hostname": "","User": ""},{"Model": "No Reservation on SIP","Count": "0","Date": "2014-02-24","Hour":"00:00:00","Hostname": "","User": ""},{"Model": "No Reservation on SPA","Count": "0","Date": "2014-02-24","Hour": "00:00:00","Hostname": "","User": ""},{"Model": "No Reservation on Model","Count": "0","Date": "2014-02-24","Hour": "01:00:00","Hostname": "","User": ""},{"Model": "No Reservation on RP","Count": "0","Date": "2014-02-24","Hour": "01:00:00","Hostname": "","User": ""},{"Model": "No Reservation on ESP","Count": "0","Date": "2014-02-24","Hour": "01:00:00","Hostname": "","User": ""},{"Model": "No Reservation on SIP","Count": "0","Date": "2014-02-24","Hour": "01:00:00","Hostname": "","User": ""},{"Model": "NoReservation on SPA","Count": "0","Date": "2014-02-24","Hour": "01:00:00","Hostname": "","User": ""}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
//			statselectlimit(pages);
//			$("#totalmatchesdomain").empty().append(total);            
			var html = "<thead>";
			html = html+"<tr class='ui-bar-d header tableRM' ";
			html = html+"style='border-radius:5px; alight:center;'>";
			html = html+'<th>Model</th>';
			html = html+'<th>Reservation Date</th>';
			html = html+'<th data-priority="2">Time</th>';
			html = html+'<th data-priority="3">Total No. of Devices</th>';
			html = html+'<th data-priority="3">User</th>';
			html = html+'</tr></thead><tbody>';
			for (var a=0; a< jsonData.root.row.length; a++){
				html += "<tr style='text-align:center'>"
				html += "<td>"+jsonData.root.row[a].Model+"</td>"
				html += "<td>"+jsonData.root.row[a].Date+"</td>"
				html += "<td>"+jsonData.root.row[a].Hour+"</td>"
				html += "<td>"+jsonData.root.row[a].Count+"</td>"
				var User = jsonData.root.row[a].User;
				if (User == ''){
					User = 'N/A';
				}
				html += "<td>"+User+"</td>"
				html += "</tr>"
			}
//			html = devicedetailedtablecontent(jsondata,html);
			html = html+"</tbody>";
//			$("#filterstat").empty().append(filter);            
//			$("#filterstat option").last().addclass('last');
//			$("#DeviceReservation").empty().append(html);            
//			$("#DeviceReservation tbody").last().addclass('last');
//			$("#usersAdmin-table").table("refresh");
		//	$('#domain-table1 thead').empty();
			$('#liReservation-table1 tbody').empty().append(html);
			if(globalDeviceType != "Mobile"){
			}else{
	            $("#liReservation-table1").table("refresh");
			}
		}
	});
	$('#liReservation-table0').hide()
	$('#liReservation-table1').show()
	$('#liReservation-table2').hide()
		

}


function ReservationUserTable(){
//	getUlDomains();
	$('#domain-table1').hide();
	$('#domain-table0').hide();
	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?action=usertable&query=`view=daily`date=2014-02-24`limit=10`page=1';
	$.ajax({
        url: url,
		datatype: 'html',
        success: function(data) {
            var mydata = data;
//console.log(">>> ",mydata);
            var parser = new DOMParser();
            var xmlDoc;
           // xmlDoc = parser.parseFromString( mydata , "text/xml" );
           	xmlDoc = data;
			var root = xmlDoc.getElementsByTagName('root');
			var row = xmlDoc.getElementsByTagName('row');
			var limit = root[0].getAttribute('limit');
//			console.log(limit);
/*			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;*/
//			statselectlimit(pages);
//			$("#totalmatchesdomain").empty().append(total);            
/*			var html = "<thead>";
			html = html+"<tr class='ui-bar-d header tableRM' ";
			html = html+"style='border-radius:5px; alight:center;'>";
			html = html+'<th>ID</th>';
			html = html+'<th>Reservation Date</th>';
			html = html+'<th data-priority="2">Time</th>';
			html = html+'<th data-priority="3">Total No. of User</th>';
			html = html+'</tr></thead><tbody>';*/
			var html = '';
			for (var a=0; a<row.length; a++){
				html += "<tr style='text-align:center'>"
				html += "<td>"+row[a].getAttribute('ID')+"</td>"
				html += "<td>"+row[a].getAttribute('Date')+"</td>"
				html += "<td>"+row[a].getAttribute('Hour')+"</td>"
				html += "<td>"+row[a].getAttribute('Count')+"</td>"
/*				html += "<td>"+jsonData.root.row[a].Date+"</td>"
				html += "<td>"+jsonData.root.row[a].Hour+"</td>"
				html += "<td>"+jsonData.root.row[a].Count+"</td>"*/
				html += "</tr>"
			}
//			html = devicedetailedtablecontent(jsondata,html);
//			html = html+"</tbody>";
//			$("#filterstat").empty().append(filter);            
//			$("#filterstat option").last().addclass('last');
//			$("#DeviceReservation").empty().append(html);            
//			$("#DeviceReservation tbody").last().addclass('last');
//			$("#usersAdmin-table").table("refresh");
//			$('#liReservation-table2 thead').empty();
			$('#liReservation-table2 tbody').empty().append(html);
			if(globalDeviceType != "Mobile"){
			}else{
	            $("#liReservation-table0").table("refresh");
			}
		}
	});
	$('#liReservation-table0').hide()
	$('#liReservation-table1').hide()
	$('#liReservation-table2').show()


}
function StatisticsSummary(){
	var url = getURL("STAT")+'action=statsummary&query=view='+globalStatsView+'`date=2014-03-12`checked=Reservation,Device,User';
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
			var sum = '<tr>';
			for (var c=0; c<row.length; c++){
				sum += "<td><a>"+row[c].getAttribute('component')+": ";
				sum += "<b>"+row[c].getAttribute('Max')+"</b></a>&nbsp;&nbsp</td>";
			}
			sum = sum+"</tr>"
			$("#s2").empty().append(sum);
			$("#s2 tbody").last().addClass('last');
/*			var userN = row[0].getAttribute('component');
			var userV = row[0].getAttribute('Max');
			var reserveN = row[1].getAttribute('component');	
			var reserveV = row[1].getAttribute('Max');
			var deviceN = row[2].getAttribute('component');	
			var deviceV = row[2].getAttribute('Max');*/
				
		}
	});
}

function weekly(){
	var sDate = $('#statTime').val();
	var yr = $('#sYear').val();
	var mon = $('#statTime').html();
	if (mon == 'April' || mon == 'June"' || mon == 'September' || mon == 'November'){
		var LDay = '30'
	}else if(mon == "February"){
		if (yr == '2016' || yr == '2020' || yr == '2024' || yr == '2028'){
			var LDay = '29';
		}else{
			var LDay = '29';
		}
		}else{
			var LDay = '31';
		}
		sDate = yr+sDate+"01"+yr+sDate+LDay;
		//console.log(sDate);	


}
function hideMainTable(){
	$("#domain-tableDDR").hide();
	$("#domain-tableDDU").hide();
	$("#domain-tableDSR").hide();
	$("#domain-tableDSU").hide();

	$("#domain-tableRDR").hide();
	$("#domain-tableRDU").hide();
	$("#domain-tableRSR").hide();
	$("#domain-tableRSU").hide();

	$("#domain-tableSDR").hide();
	$("#domain-tableSDU").hide();
	$("#domain-tableSSR").hide();
	$("#domain-tableSSU").hide();

	$("#domain-tableMDR").hide();
	$("#domain-tableMDU").hide();
	$("#domain-tableMSR").hide();
	$("#domain-tableMSU").hide();

	$("#domain-tablePDR").hide();
	$("#domain-tablePDU").hide();
	$("#domain-tablePSR").hide();
	$("#domain-tablePSU").hide();
	$("#domain-table0").hide();

}
//=====================================================================
function DeviceDetailedTable2(){
	var date = globalDate.split(",");
	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=devicedetailedview&id=&limit='+globalStatLimit+'&page='+globalStatPage+'&view='+globalStatsView+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&date='+globalDate;

//	console.log(url);
	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			//console.log(data);
            var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var root = xmlDoc.getElementsByTagName('root'); 
            var row = xmlDoc.getElementsByTagName('row');
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			//console.log(pages);
			StatSelectLimit(pages);
			$("#totalMatchesDomain").empty().append(total);            
			var filter = "<option value='DeviceId'></option>";
			filter = filter+"<option value='DeviceId'>ID</option>";
			filter = filter+"<option value='HostName'>HostName</option>";
			filter = filter+"<option value='ManagementIp'>MgmtIP</option>";
			filter = filter+"<option value='ConsoleIP'>Console IP</option>";
			filter = filter+"<option value='Manufacturer'>Manufacturer</option>";
			filter = filter+"<option value='Model'>Model</option>";
			filter = filter+"<option value='DeviceType'>Model</option>";

/*			var deviceD = "<thead id=rmResStat><tr class='ui-bar-d'>";
			deviceD = deviceD+"<th>ID</th><th>Date Added</th>";
			deviceD = deviceD+"<th data-priority='2'>HostName</th>";
			deviceD = deviceD+"<th data-priority='6'>MgmtIP</th>";
			deviceD = deviceD+"<th data-priority='6'>Console IP</th>";
			deviceD = deviceD+"<th data-priority='6'>Manufacturer</th>";
			deviceD = deviceD+"<th data-priority='2'>Model</th>";
			deviceD = deviceD+"<th data-priority='6'>Device Type</th>";
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
			deviceD = deviceD+"</tr></thead><tbody id='tbodyDevice'><tr>";*/
			var deviceD = '';
			for (a=0; a< row.length; a++){
				
				deviceD += "<tr>";
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
			//deviceD = deviceD+"</tbody>";
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tableDDU > tbody").empty().append(deviceD);            
				$("#domain-tableDDU  tbody").last().addClass('last');
				$("#domain-tableDDU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tableDDR tbody").empty().append(deviceD);            
				$("#domain-tableDDR > tbody").last().addClass('last');
				$("#domain-tableDDR").show();
			}
			$("#filterStat").empty().append(filter);            
			$("#filterStat option").last().addClass('last');
		
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');

					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});
	

	
	
	
}
function DeviceSummaryTable2(){

	hideMainTable();
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modelstats&query='+globalDate+"&domain="+globalDomainContent+'&limit='+globalStatLimit+'&page=1&user='+globalUserName+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view='+globalStatsView;
	
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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
		//	var deviceD = "<thead id=rmResStat><tr class='ui-bar-d'>";
//			if(globalDeviceType != "Mobile"){
//				var html = "<thead><tr class='ui-bar-d header tableRM' style='margin-right:5px; width:98%;'>"
//				html = html+"<th><input type='checkbox' id='statSelectAll' onclick='checkAllStatTable();'/></th>";
//			}else{
				var html = "<thead id=rmResStat><tr class='ui-bar-d'>";
//			}
			
			var filter = "<option value=Model></option>";
			filter = filter+"<option value=Model>Model</option>";
			filter = filter+"<option value=Manaufacturer>Manaufacturer</option>";
/*			var deviceD = html;		
			deviceD = deviceD+"<th>Model</th>";
			deviceD = deviceD+"<th>Number Of Devices</th>";
			deviceD = deviceD+"<th>Manaufacturer</th>";

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
			deviceD = deviceD+"</tr></thead><tbody id='tbodyDevice'><tr>";*/
			var deviceD = ''
			for (a=0; a< row.length; a++){
				deviceD += "<tr class='trStat'>";
				deviceD += "<td>"+row[a].getAttribute('Name')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('NumberOfDevices')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('Manufacturer')+"</td>";

				var TotalPercentIdle = row[a].getAttribute('TotalPercentIdle');
					if (TotalPercentIdle == ''){
						TotalPercentIdle = '0.00';
					}

				var PassPercent = row[a].getAttribute('PassPercent');
					if (PassPercent == ''){
						PassPercent = '0.00';
					}
				var PercentGeneric = row[a].getAttribute('PercentGeneric');
					if (PercentGeneric == ''){
						PercentGeneric = '0.00';
					}
				var PercentExplicit = row[a].getAttribute('PercentExplicit');
					if (PercentExplicit == ''){
						PercentExplicit = '0.00';
					}
				
				var PercentGenericFailed = row[a].getAttribute('PercentGenericFailed');
					if (PercentGenericFailed == ''){
						PercentGenericFailed = '0.00';
					}
				var PercentExplicitFailed = row[a].getAttribute('PercentExplicitFailed');
					if (PercentExplicitFailed == ''){
						PercentExplicitFailed = '0.00';
					}
				var CancelPercent = row[a].getAttribute('CancelPercent');
					if (CancelPercent == ''){
						CancelPercent = '0.00';
					}
				if (globalStatsViewNew == 'Utilization'){
					deviceD += "<td>"+row[a].getAttribute('AverageIdle')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('AverageDuration')+"</td>";
					deviceD += "<td>"+TotalPercentIdle+"</td>";
					deviceD += "<td>"+row[a].getAttribute('AverageUtilization')+"</td>";

				}else if(globalStatsViewNew == 'Reservation'){
					deviceD += "<td>"+row[a].getAttribute('PassCount')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Generic')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Failed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					deviceD += "<td>"+row[a].getAttribute('Cancelled')+"</td>";
					deviceD += "<td>"+PassPercent+"</td>";
					deviceD += "<td>"+PercentGeneric+"</td>";
					deviceD += "<td>"+PercentExplicit+"</td>";
					deviceD += "<td>"+row[a].getAttribute('FailedPercent')+"</td>";
					deviceD += "<td>"+PercentGenericFailed+"</td>";
					deviceD += "<td>"+PercentExplicitFailed+"</td>";
					deviceD += "<td>"+CancelPercent+"</td>";

				}
				deviceD += "</tr>";
			}
//			deviceD = deviceD+"</tbody>";
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
//			$("#domain-table0").empty().append(deviceD);
//			$("#domain-table0 tbody").last().addClass('last');
			hideMainTable();			
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tableDSU > tbody").empty().append(deviceD);            
				$("#domain-tableDSU  tbody").last().addClass('last');
				$("#domain-tableDSU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tableDSR tbody").empty().append(deviceD);            
				$("#domain-tableDSR > tbody").last().addClass('last');
				$("#domain-tableDSR").show();
			}
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');

					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});
}
function SlotDetailedTable2(){



	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=slotdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view='+globalStatsView;
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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
			var filter = "<option value=DeviceID></option>";
			filter = filter+"<option value=DeviceID>DeviceID</option>";
			filter = filter+"<option value=HostName>HostName</option>";
			filter = filter+"<option value=Number>Number</option>";
			filter = filter+"<option value=ProductIdentifier>ProductIdentifier</option>";
			filter = filter+"<option value=Description>Description</option>";
/*			var deviceD = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			deviceD = deviceD+"<th>DeviceID</th>";
			deviceD = deviceD+"<th>Date Added</th>";
			deviceD = deviceD+"<th>HostName</th>";
			deviceD = deviceD+"<th>Number</th>";
			deviceD = deviceD+"<th>ProductIdentifier</th>";
			deviceD = deviceD+"<th>Description</th>";
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
			deviceD = deviceD+"</tr></thead><tbody id='tbodyDevice'><tr>";*/

			var deviceD = '';	
			for (a=0; a< row.length; a++){
				var ProductIdentifier = row[a].getAttribute('ProductIdentifier');
				if (ProductIdentifier == ''){
					ProductIdentifier = 'N/A';
				}
				var Description = row[a].getAttribute('Description');
				if (Description == ''){
					Description = 'N/A';
				}
				deviceD += "<tr class='trStat'>";
				deviceD += "<td>"+row[a].getAttribute('DeviceId')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('DateAdded')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('HostName')+"</td>";
				deviceD += "<td>"+row[a].getAttribute('Number')+"</td>";
				deviceD += "<td>"+ProductIdentifier+"</td>";
				deviceD += "<td>"+Description+"</td>";
	
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
				deviceD += "</tr>";
			
			}			
//			deviceD = deviceD+"</tbody>";
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			//$("#domain-table0").empty().append(deviceD);
			//$("#domain-table0 tbody").last().addClass('last');
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tableSDU > tbody").empty().append(deviceD);            
				$("#domain-tableSDU  tbody").last().addClass('last');
				$("#domain-tableSDU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tableSDR tbody").empty().append(deviceD);            
				$("#domain-tableSDR > tbody").last().addClass('last');
				$("#domain-tableSDR").show();
			}
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');
	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});
}
function SlotSummaryTable2(){
	if (globalDeviceType != "Mobile"){
		globalDomainContent = 'Any';
	}


	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=esprpstats&query='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page=1&view='+globalStatsView;

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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
			var filter = "<option value=ProductIdentifier></option>";
			filter = filter+"<option value=ProductIdentifier>Product Identifier</option>";
			/*r SlotS = "<thead id=rmResStat><tr class='ui-bar-d'>";
			
			SlotS = SlotS+"<th>Product Identifier</th>";
			SlotS = SlotS+"<th>Number of Cards</th>";

			if (globalStatsViewNew == 'Utilization'){
				SlotS = SlotS+"<th data-priority='2'>Idle(Hrs Mins)</th>";
				SlotS = SlotS+"<th data-priority='2'>Reserved(Hrs Mins)</th>";
				SlotS = SlotS+"<th data-priority='2'>Idle(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Reservation(%)</th>";
			}else if(globalStatsViewNew == 'Reservation'){
				
				SlotS = SlotS+"<th data-priority='2'>Scheduled</th>";
				SlotS = SlotS+"<th data-priority='2'>Generic</th>";
				SlotS = SlotS+"<th data-priority='2'>Explicit</th>";
				SlotS = SlotS+"<th data-priority='2'>Re-Scheduled</th>";
				SlotS = SlotS+"<th data-priority='2'>Generic</th>";
				SlotS = SlotS+"<th data-priority='2'>Explicit</th>";
				SlotS = SlotS+"<th data-priority='2'>Cancelled</th>";
				SlotS = SlotS+"<th data-priority='2'>Scheduled(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Generic(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Explicit(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Re-Scheduled(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Generic(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Explicit(%)</th>";
				SlotS = SlotS+"<th data-priority='2'>Cancelled(%)</th>";
			}
			SlotS = SlotS+"</tr></thead><tbody id='tbodyDevice'><tr>";*/
			var SlotS = '';

			for (a=0; a< row.length; a++){
				SlotS += "<tr class='trStat'>";
				SlotS += "<td>"+row[a].getAttribute('Name')+"</td>";
				SlotS += "<td>"+row[a].getAttribute('NumberOfSlots')+"</td>";

				if (globalStatsViewNew == 'Utilization'){

					SlotS += "<td>"+row[a].getAttribute('AverageIdle')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('AverageDuration')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('AveragePercentIdle')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('TotalPercentUtilization')+"</td>";

				}else if(globalStatsViewNew == 'Reservation'){

					SlotS += "<td>"+row[a].getAttribute('PassCount')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('Generic')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('Failed')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('Cancelled')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('PassPercent')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('PercentGeneric')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('PercentExplicit')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('FailedPercent')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('PercentGenericFailed')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('PercentExplicitFailed')+"</td>";
					SlotS += "<td>"+row[a].getAttribute('CancelPercent')+"</td>";

				}
				SlotS += "</tr>";
			}
		//console.log(SlotS);
//			SlotS = SlotS+"</tbody>";
//			$("#domain-table0").empty().append(SlotS);
//			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tableSSU > tbody").empty().append(SlotS);   
				$("#domain-tableSSU  tbody").last().addClass('last');
				$("#domain-tableSSU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tableSSR tbody").empty().append(SlotS);            
				$("#domain-tableSSR > tbody").last().addClass('last');
				$("#domain-tableSSR").show();
			}
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');

					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');

					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();

		}
	});
}
function ModuleDetailedTable2(){


	var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=moduledetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;


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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
			var filter = "<option value=DeviceId></option>";
			filter = filter+"<option value=DeviceId>ID</option>";
			filter = filter+"<option value=HostName>HostName</option>";
			filter = filter+"<option value=SlotNumber>SlotNumber</option>";
			filter = filter+"<option value=SlotProductId>SlotProductId</option>";
			filter = filter+"<option value=ModuleNumber>ModuleNumber</option>";
			filter = filter+"<option value=ModuleProductId>ModuleProductId</option>";
			filter = filter+"<option value=ModuleDescription>ModuleDescription</option>";
			/*var moduleD = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			moduleD = moduleD+"<th>ID</th>";
			moduleD = moduleD+"<th>Date Added</th>";
			moduleD = moduleD+"<th>HostName</th>";
			moduleD = moduleD+"<th>Slot Number</th>";
			moduleD = moduleD+"<th>Slot Product Id</th>";
			moduleD = moduleD+"<th>Module Number</th>";
			moduleD = moduleD+"<th>Module Description</th>";
			if (globalStatsViewNew == 'Utilization'){

				moduleD = moduleD+"<th data-priority='2'>Idle(Hrs Mins)</th>";
				moduleD = moduleD+"<th data-priority='2'>Reserved(Hrs Mins)</th>";
				moduleD = moduleD+"<th data-priority='2'>Idle(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Reservation(%)</th>";

			}else if(globalStatsViewNew == 'Reservation'){
				
				moduleD = moduleD+"<th data-priority='2'>Scheduled</th>";
				moduleD = moduleD+"<th data-priority='2'>Generic</th>";
				moduleD = moduleD+"<th data-priority='2'>Explicit</th>";
				moduleD = moduleD+"<th data-priority='2'>Re-Scheduled</th>";
				moduleD = moduleD+"<th data-priority='2'>Generic</th>";
				moduleD = moduleD+"<th data-priority='2'>Explicit</th>";
				moduleD = moduleD+"<th data-priority='2'>Cancelled</th>";
				moduleD = moduleD+"<th data-priority='2'>Scheduled(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Generic(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Explicit(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Re-Scheduled(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Generic(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Explicit(%)</th>";
				moduleD = moduleD+"<th data-priority='2'>Cancelled(%)</th>";
			}
			moduleD = moduleD+"</tr></thead><tbody id='tbodyDevice'><tr>";*/
			var moduleD = '';
				
			for (a=0; a< row.length; a++){
				moduleD  += "<tr class='trStat'>";
				moduleD += "<td>"+row[a].getAttribute('DeviceId')+"</td>";
				moduleD += "<td>"+row[a].getAttribute('DateAdded')+"</td>";
				moduleD += "<td>"+row[a].getAttribute('HostName')+"</td>";
				moduleD += "<td>"+row[a].getAttribute('SlotNo')+"</td>";
				moduleD += "<td>"+row[a].getAttribute('SlotProductIdentifier')+"</td>";
				moduleD += "<td>"+row[a].getAttribute('ModuleNo')+"</td>";
				moduleD += "<td>"+row[a].getAttribute('Description')+"</td>";

				if (globalStatsViewNew == 'Utilization'){

					moduleD += "<td>"+row[a].getAttribute('Idle')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('Util')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentIdle')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentUtil')+"</td>";
				}else if(globalStatsViewNew == 'Reservation'){

					moduleD += "<td>"+row[a].getAttribute('Pass')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('Generic')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('Fail')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('NumberOfCancellation')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentPass')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentGeneric')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentExplicit')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentFail')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentGenericFailed')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentExplicitFailed')+"</td>";
					moduleD += "<td>"+row[a].getAttribute('PercentCancel')+"</td>";
				}
				moduleD += "</tr>";
			}
//			moduleD = moduleD+"</tbody>";
//			console.log(moduleD);
//			$("#domain-table0").empty().append(moduleD);
//			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tableMDU > tbody").empty().append(moduleD);   
				$("#domain-tableMDU  tbody").last().addClass('last');
				$("#domain-tableMDU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tableMDR tbody").empty().append(moduleD);            
				$("#domain-tableMDR > tbody").last().addClass('last');
				$("#domain-tableMDR").show();
			}
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');

					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');
	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});

}

function ModuleSummaryTable2(){


	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=modulestats&query='+globalDate+"&domain="+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&page='+globalStatPage+'&view='+globalStatsView;
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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
			var filter = "<option value=ProductIdentifier></option>";
			filter = filter+"<option value=ProductIdentifier>Product Identifier</option>";
			/*var moduleS = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			moduleS = moduleS+"<th>Product Identifier</th>";
			moduleS = moduleS+"<th>Number of Modules</th>";

			if (globalStatsViewNew == 'Utilization'){
				moduleS = moduleS+"<th data-priority='2'>Idle(Hrs Mins)</th>";
				moduleS = moduleS+"<th data-priority='2'>Reserved(Hrs Mins)</th>";
				moduleS = moduleS+"<th data-priority='2'>Idle(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Reservation(%)</th>";
			}else if(globalStatsViewNew == 'Reservation'){
				
				moduleS = moduleS+"<th data-priority='2'>Scheduled</th>";
				moduleS = moduleS+"<th data-priority='2'>Generic</th>";
				moduleS = moduleS+"<th data-priority='2'>Explicit</th>";
				moduleS = moduleS+"<th data-priority='2'>Re-Scheduled</th>";
				moduleS = moduleS+"<th data-priority='2'>Generic</th>";
				moduleS = moduleS+"<th data-priority='2'>Explicit</th>";
				moduleS = moduleS+"<th data-priority='2'>Cancelled</th>";
				moduleS = moduleS+"<th data-priority='2'>Scheduled(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Generic(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Explicit(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Re-Scheduled(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Generic(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Explicit(%)</th>";
				moduleS = moduleS+"<th data-priority='2'>Cancelled(%)</th>";
			}
			moduleS = moduleS+"</tr></thead><tbody id='tbodyDevice'><tr>";*/
			var moduleS = '';

			for (a=0; a< row.length; a++){
				moduleS += "<tr class='trStat'>";
				moduleS += "<td>"+row[a].getAttribute('Name')+"</td>";
				moduleS += "<td>"+row[a].getAttribute('NumberOfModules')+"</td>";

				if (globalStatsViewNew == 'Utilization'){

					moduleS += "<td>"+row[a].getAttribute('AverageIdle')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('AverageDuration')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('AveragePercentIdle')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('TotalPercentUtilization')+"</td>";

				}else if(globalStatsViewNew == 'Reservation'){

					moduleS += "<td>"+row[a].getAttribute('PassCount')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('Generic')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('Failed')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('Cancelled')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('PassPercent')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('PercentGeneric')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('PercentExplicit')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('FailedPercent')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('PercentGenericFailed')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('PercentExplicitFailed')+"</td>";
					moduleS += "<td>"+row[a].getAttribute('CancelPercent')+"</td>";

				}
				moduleS += "</tr>";
			}
//			moduleS = moduleS+"</tbody>";
//			$("#domain-table0").empty().append(moduleS);
//			$("#domain-table0 tbody").last().addClass('last');
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tableMSU > tbody").empty().append(moduleS);   
				$("#domain-tableMSU  tbody").last().addClass('last');
				$("#domain-tableMSU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tableMSR tbody").empty().append(moduleS);
				$("#domain-tableMSR > tbody").last().addClass('last');
				$("#domain-tableMSR").show();
			}
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');

					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});
}

function PortDetailedTable2(){

	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=portdetailedview&id=&limit='+globalStatLimit+'&page=1&view='+globalStatsView+'&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch;
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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
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
			/*var PortD = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			PortD = PortD+"<th>ID</th>";
			PortD = PortD+"<th>Date Added</th>";
			PortD = PortD+"<th>HostName</th>";
			PortD = PortD+"<th>Slot Number</th>";
			PortD = PortD+"<th>Slot Product Id</th>";
			PortD = PortD+"<th>Module Number</th>";
			PortD = PortD+"<th>Module Product Id</th>";
			PortD = PortD+"<th>PortName</th>";
			PortD = PortD+"<th>Port Number</th>";
			PortD = PortD+"<th>Media Type</th>";
			PortD = PortD+"<th>Speed</th>";
			PortD = PortD+"<th>Port Description</th>";
			PortD = PortD+"<th>Partner Device</th>";
		
			if (globalStatsViewNew == 'Utilization'){

				PortD = PortD+"<th data-priority='2'>Idle(Hrs Mins)</th>";
				PortD = PortD+"<th data-priority='2'>Reserved(Hrs Mins)</th>";
				PortD = PortD+"<th data-priority='2'>Idle(%)</th>";
				PortD = PortD+"<th data-priority='2'>Reservation(%)</th>";

			}else if(globalStatsViewNew == 'Reservation'){
				
				PortD = PortD+"<th data-priority='2'>Scheduled</th>";
				PortD = PortD+"<th data-priority='2'>Generic</th>";
				PortD = PortD+"<th data-priority='2'>Explicit</th>";
				PortD = PortD+"<th data-priority='2'>Re-Scheduled</th>";
				PortD = PortD+"<th data-priority='2'>Generic</th>";
				PortD = PortD+"<th data-priority='2'>Explicit</th>";
				PortD = PortD+"<th data-priority='2'>Cancelled</th>";
				PortD = PortD+"<th data-priority='2'>Scheduled(%)</th>";
				PortD = PortD+"<th data-priority='2'>Generic(%)</th>";
				PortD = PortD+"<th data-priority='2'>Explicit(%)</th>";
				PortD = PortD+"<th data-priority='2'>Re-Scheduled(%)</th>";
				PortD = PortD+"<th data-priority='2'>Generic(%)</th>";
				PortD = PortD+"<th data-priority='2'>Explicit(%)</th>";
				PortD = PortD+"<th data-priority='2'>Cancelled(%)</th>";
			}
			PortD = PortD+"</tr></thead><tbody id='tbodyDevice'><tr>";*/
			var PortD = '';

			for (a=0; a< row.length; a++){
				PortD += "<tr class='trStat'>";
				PortD += "<td>"+row[a].getAttribute('DeviceId')+"</td>";
				PortD += "<td>"+row[a].getAttribute('DateAdded')+"</td>";
				PortD += "<td>"+row[a].getAttribute('HostName')+"</td>";
				PortD += "<td>"+row[a].getAttribute('SlotNumber')+"</td>";
				PortD += "<td>"+row[a].getAttribute('SlotProductId')+"</td>";
				PortD += "<td>"+row[a].getAttribute('ModuleNumber')+"</td>";
				PortD += "<td>"+row[a].getAttribute('ModuleProductId')+"</td>";
				PortD += "<td>"+row[a].getAttribute('PortName')+"</td>";
				PortD += "<td>"+row[a].getAttribute('PortNumber')+"</td>";
				PortD += "<td>"+row[a].getAttribute('MediaType')+"</td>";
				PortD += "<td>"+row[a].getAttribute('Speed')+"</td>";
				PortD += "<td>"+row[a].getAttribute('PortDescription')+"</td>";
				PortD += "<td>"+row[a].getAttribute('PartnerDevice')+"</td>";
	
				if (globalStatsViewNew == 'Utilization'){
					PortD += "<td>"+row[a].getAttribute('Idle')+"</td>";
					PortD += "<td>"+row[a].getAttribute('Util')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentIdle')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentUtil')+"</td>";

				}else if(globalStatsViewNew == 'Reservation'){

					PortD += "<td>"+row[a].getAttribute('Pass')+"</td>";
					PortD += "<td>"+row[a].getAttribute('Generic')+"</td>";
					PortD += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					PortD += "<td>"+row[a].getAttribute('Fail')+"</td>";
					PortD += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					PortD += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					PortD += "<td>"+row[a].getAttribute('NumberOfCancellation')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentPass')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentGeneric')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentExplicit')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentFail')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentGenericFailed')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentExplicitFailed')+"</td>";
					PortD += "<td>"+row[a].getAttribute('PercentCancel')+"</td>";


				}
				PortD += "</tr>";
			}			
//			PortD = PortD+"</tbody>";
//			$("#domain-table0").empty().append(PortD);
//			$("#domain-table0 tbody").last().addClass('last');
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tablePDU > tbody").empty().append(PortD);   
				$("#domain-tablePDU  tbody").last().addClass('last');
				$("#domain-tablePDU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tablePDR tbody").empty().append(PortD);
				$("#domain-tablePDR > tbody").last().addClass('last');
				$("#domain-tablePDR").show();
			}
			$("#filterStat").empty().append(filter);
			$("#filterStat option").last().addClass('last');
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');

					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});
}
function PortSummaryTable2(){
	if (globalDeviceType != "Mobile"){
		globalDomainContent = 'Any';
	}



	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?action=portstats&query='+globalDate+'&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&limit='+globalStatLimit+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view='+globalStatsView;
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
			var pages = root[0].getAttribute('pages')
			var total = root[0].getAttribute('total')
			$("#totalMatchesDomain").empty().append(total);            
			var filter = "<option value=Description></option>";
			filter = filter+"<option value=Description>Description</option>";
			/*var portS = "<thead id=rmResStat><tr class='ui-bar-d'>";
			

			portS = portS+"<th>Description</th>";
			portS = portS+"<th>Number of Ports</th>";

			if (globalStatsViewNew == 'Utilization'){
				portS = portS+"<th data-priority='2'>Idle(Hrs Mins)</th>";
				portS = portS+"<th data-priority='2'>Reserved(Hrs Mins)</th>";
				portS = portS+"<th data-priority='2'>Idle(%)</th>";
				portS = portS+"<th data-priority='2'>Reservation(%)</th>";
			}else if(globalStatsViewNew == 'Reservation'){
				
				portS = portS+"<th data-priority='2'>Scheduled</th>";
				portS = portS+"<th data-priority='2'>Generic</th>";
				portS = portS+"<th data-priority='2'>Explicit</th>";
				portS = portS+"<th data-priority='2'>Re-Scheduled</th>";
				portS = portS+"<th data-priority='2'>Generic</th>";
				portS = portS+"<th data-priority='2'>Explicit</th>";
				portS = portS+"<th data-priority='2'>Cancelled</th>";
				portS = portS+"<th data-priority='2'>Scheduled(%)</th>";
				portS = portS+"<th data-priority='2'>Generic(%)</th>";
				portS = portS+"<th data-priority='2'>Explicit(%)</th>";
				portS = portS+"<th data-priority='2'>Re-Scheduled(%)</th>";
				portS = portS+"<th data-priority='2'>Generic(%)</th>";
				portS = portS+"<th data-priority='2'>Explicit(%)</th>";
				portS = portS+"<th data-priority='2'>Cancelled(%)</th>";
			}
			portS = portS+"</tr></thead><tbody id='tbodyDevice'><tr>";
			*/
			var portS = '';
			for (a=0; a< row.length; a++){
				portS += "<tr class='trStat'>";
				portS += "<td>"+row[a].getAttribute('Name')+"</td>";
				portS += "<td>"+row[a].getAttribute('NumberOfPorts')+"</td>";

				if (globalStatsViewNew == 'Utilization'){

					portS += "<td>"+row[a].getAttribute('AverageIdle')+"</td>";
					portS += "<td>"+row[a].getAttribute('AverageDuration')+"</td>";
					portS += "<td>"+row[a].getAttribute('AveragePercentIdle')+"</td>";
					portS += "<td>"+row[a].getAttribute('TotalPercentUtilization')+"</td>";

				}else if(globalStatsViewNew == 'Reservation'){

					portS += "<td>"+row[a].getAttribute('PassCount')+"</td>";
					portS += "<td>"+row[a].getAttribute('Generic')+"</td>";
					portS += "<td>"+row[a].getAttribute('Explicit')+"</td>";
					portS += "<td>"+row[a].getAttribute('Failed')+"</td>";
					portS += "<td>"+row[a].getAttribute('GenericFailed')+"</td>";
					portS += "<td>"+row[a].getAttribute('ExplicitFailed')+"</td>";
					portS += "<td>"+row[a].getAttribute('Cancelled')+"</td>";
					portS += "<td>"+row[a].getAttribute('PassPercent')+"</td>";
					portS += "<td>"+row[a].getAttribute('PercentGeneric')+"</td>";
					portS += "<td>"+row[a].getAttribute('PercentExplicit')+"</td>";
					portS += "<td>"+row[a].getAttribute('FailedPercent')+"</td>";
					portS += "<td>"+row[a].getAttribute('PercentGenericFailed')+"</td>";
					portS += "<td>"+row[a].getAttribute('PercentExplicitFailed')+"</td>";
					portS += "<td>"+row[a].getAttribute('CancelPercent')+"</td>";

				}
				portS += "</tr>";
			}
//			portS = portS+"</tbody>";
//			$("#domain-table0").empty().append(portS);
//			$("#domain-table0 tbody").last().addClass('last');
			hideMainTable();
			if (globalStatsViewNew == 'Utilization'){
				$("#domain-tablePSU > tbody").empty().append(portS);   
				$("#domain-tablePSU  tbody").last().addClass('last');
				$("#domain-tablePSU").show();
			}else if(globalStatsViewNew == 'Reservation'){
				$("#domain-tablePSR tbody").empty().append(portS);
				$("#domain-tablePSR > tbody").last().addClass('last');
				$("#domain-tablePSR").show();
			}
			$("#filterStat").empty().append(filter);
			$("#filterStat tbody").last().addClass('last');
			var ctr;
			ctr = 0;	
			$(".trStat").on("click",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');
	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
			filterStatDomain();
		}
	});
}
function UserDeatiledTable2(){
	if (globalDeviceType != "Mobile"){
		globalDomainContent = 'Any';
	}



	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=userdetailedview&limit='+globalStatLimit+'&page=1&view=Day&date='+globalDate+'&detailedview=Detailed&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view='+globalStatsView;

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
		
			userD = userD+"<th>Start Reservation</th>";
			userD = userD+"<th>End Reservation</th>";
			userD = userD+"<th>Utilization</th>";
			userD = userD+"<th>Status</th>";
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
				

					
				userD += "<td>"+row[a].getAttribute('Start')+"</td>";
				userD += "<td>"+row[a].getAttribute('End')+"</td>";
				userD += "<td>"+row[a].getAttribute('Duration')+"</td>";
				userD += "<td>"+row[a].getAttribute('Status')+"</td>";
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

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');
	
					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
		filterStatU();
		}
	});
}


function UserSummaryTable2(){
	if (globalDeviceType != "Mobile"){
		globalDomainContent = 'Any';
	}



	
    var url = 'https://'+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?action=usersummaryview&limit='+globalStatLimit+'&page=1&view=Day&date='+globalDate+'&detailedview=Summary&domain='+globalDomainContent+'&filter='+globalStatFilter+'&terminal='+globalTerminal+'&switch='+globalSwitch+'&view='+globalStatsView;

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
			$(".trStat").on("tap",function(){

				if($(this).hasClass('highlight') == false){
					$(this).addClass('highlight');

					var val = $(this).attr('DeviceId');
	
					ctr++;
				}else{
 	        		$(this).removeClass('highlight');
					var val = $(this).attr('DeviceId');

					ctr--;	
				}
				selectedRow();
				if(ctr == 0){

				}	
			});
		filterStatU();
		}
	});
}
function ReservationReservationTable(){
//	getUlDomains();
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?action=reservationstat&query=`view=daily`date=2014-02-24`limit=10`page=1";
	$.ajax({
        url: url,
		datatype: 'html',
        success: function(data) {
//				data = '{"root": {"page": "1","pages": "3","total": "24","row": [{"ID": "1","Date": "2014-02-24","Hour": "00:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "2","Date": "2014-02-24","Hour": "01:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "3","Date":"2014-02-24","Hour": "02:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "4","Date": "2014-02-24","Hour": "03:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "5","Date": "2014-02-24","Hour": "04:00:00","API": "0","Titan": "0","Topo":"0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "6","Date": "2014-02-24","Hour": "05:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "7","Date": "2014-02-24","Hour": "06:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "8","Date": "2014-02-24","Hour": "07:00:00","API": "0","Titan": "0","Topo":"0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "9","Date": "2014-02-24","Hour": "08:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"},{"ID": "10","Date": "2014-02-24","Hour": "09:00:00","API": "0","Titan": "0","Topo": "0","ConfigEditor": "0","Reserved": "0","Rescheduled": "0","TotalNumberOfReservation": "0","TotalNumberOfDevices": "0"}]}}';
			var jsonData = jQuery.parseJSON(data)
			var total = jsonData.root.total;
			var pages = jsonData.root.pages;
			//console.log(total+"  "+pages);
//			statselectlimit(pages);
//			$("#totalmatchesdomain").empty().append(total);            
			var html = "<thead>";
			html = html+"<tr class='ui-bar-d header tableRM' ";
			html = html+"style='border-radius:5px; alight:center;'>";
			html = html+'<th>Reservation ID</th>';
			html = html+'<th>Reservation Date</th>';
			html = html+'<th data-priority="2">Total No. of Reservation</th>';
			html = html+'<th data-priority="3">Total No. of Devices</th>';
			html = html+'<th data-priority="3">API</th>';
			html = html+'<th data-priority="4">Titan</th>';
			html = html+'<th data-priority="5">Topo</th>';
			html = html+'<th data-priority="6">Config Editor</th>';
			html = html+'<th data-priority="6">Reserved</th>';
			html = html+'<th data-priority="6">Re-Scheduled</th>';
			html = html+'<th data-priority="6">Failed</th></tr></thead>';
			html = html+'<tbody>';
			for (var a=0; a< jsonData.root.row.length; a++){
				html += "<tr style='text-align:center'>"
				html += "<td>"+jsonData.root.row[a].ID+"</td>"
				html += "<td>"+jsonData.root.row[a].Date+"</td>"
				html += "<td>"+jsonData.root.row[a].Hour+"</td>"
				html += "<td>"+jsonData.root.row[a].TotalNumberOfReservation+"</td>"
				html += "<td>"+jsonData.root.row[a].TotalNumberOfDevices+"</td>"
				html += "<td>"+jsonData.root.row[a].API+"</td>"
				html += "<td>"+jsonData.root.row[a].Titan+"</td>"
				html += "<td>"+jsonData.root.row[a].Topo+"</td>"
				html += "<td>"+jsonData.root.row[a].ConfigEditor+"</td>"
				html += "<td>"+jsonData.root.row[a].Reserved+"</td>"
				html += "<td>"+jsonData.root.row[a].Rescheduled+"</td>"
				html += "</tr>"
			}
//			html = devicedetailedtablecontent(jsondata,html);
			html = html+"</tbody>";
//			$("#filterstat").empty().append(filter);            
//			$("#filterstat option").last().addclass('last');
//			$("#DeviceReservation").empty().append(html);            
//			$("#DeviceReservation tbody").last().addclass('last');
//			$("#usersAdmin-table").table("refresh");
//			$('#liReservation-table0').empty();
			$('#liReservation-table0 tbody').empty().append(html);
			if(globalDeviceType != "Mobile"){
			}else{
	            $("#liReservation-table0").table("refresh");
			}
		}
	});


}


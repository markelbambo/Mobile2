/*
 *
 *  FUNCTION NAME : getURL
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : February 27, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : returns url for based on parameter
 *  PARAMETERS    : page
 *
 */
function getURL(page,type){
	if(type){
		var InfoType =type;
	}else{
		var InfoType = globalInfoType;
	}
	if(globalDeviceType == "Mobile"){
		var h = "http://";
	}else{
		var h = "https://";
	}
	switch(page){
		case "RM":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?";
			}
		break;
		case "RM2":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGIV3.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/NFast_RM/NFastRMCGIV3.py?";
			}
		break;
		case "RM4":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESOURCEMANAGEMENT/NFastRMCGI.py?";
			}
		break;
		case "RM3":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/RM.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/RM/RM.py?";
			}
		break;
		case "ConfigEditor":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/CONFIGEDITOR/FastQueryCgi.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/AutoCompletePythonCGI/FastQueryCgi.py?";
			}
		break;
		case "ConfigEditor2":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/CONFIGEDITOR/FastQueryCgi.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?";
			}
		break;
		case "ConfigEditorTT":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/CONFIGEDITOR/getTTPorts.fcgi?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/getTTPorts.fcgi?";
			}
		break;
		case "ConfigEditorTopo":
			return h+CURRENT_IP+"/cgi-bin/Final/RM_CGI_AutoComplete/AutoCompleteCgiQuerryjayson/FindResource2.cgi?";
		break;
		case "AdminLogs":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminLogs.fcgi?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminLogs.fcgi?";
			}
		break;
		case "ADMIN":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdmin.fcgi?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?";
			}
		break;
		case "STAT":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/STATISTICS/NFastSTATCGI.py?";
			}else{
				return h+CURRENT_IP+'/cgi-bin/Final/NFast/NFast_STAT/NFastSTATCGI.py?';
			}
		break;
		case "STAT2":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/STATISTICS/NFastSTATCGI.py?";
			}else{
				return h+CURRENT_IP+'/cgi-bin/Final/NFast_STAT/NFastSTATCGI.py?';
			}
		break;
		case "STATDetailed":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?';
			}else{
				return h+CURRENT_IP+'/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdmin.fcgi?';
			}
		break;
		case "STATSummary":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?';	
			}else{
				return h+CURRENT_IP+'/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi?';
			}
		break; 

		case "ADMIN2":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?";
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPyV3.py?";
			}
		break;
		case "ADMIN1":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?";		
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?";
			}
		break;
		case "ADMIN3":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?";		
			}else{
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?";
			}
		break;
		case "Power":
			if(InfoType == "JSON"){
				return h+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/POWER/FastQueryCgi.py?";		
			}else{
				return h+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?";
			}
		break;
		case "Console":
			return h+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?';
		default:
			return "No page yet";
	}
}

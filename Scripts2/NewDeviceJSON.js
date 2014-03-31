 /*
 *  FUNCTION NAME : setNewDevicesNode
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating DEVICEs node
 *  PARAMETERS    : 
 *
 */
function setNewDevicesNode(){
	var devicename = $("#newhostnameid").val();
	var devicetype = $("#dropdowndevicetype").val();
	var objectpath = "Device_"+deviceCtr;
	var model = "";
	if(document.getElementById("labelmodel").style.display=="none"){
        model = $("#newdevmodel").val();
    }else{
        model = $("#newdevmodel1").val();
    }
	var dndmodeltype = "AddDevice";
	var softwareversion = "";
	var osversion = "";
	var ostype = "";
	if(document.getElementById("libeloperatingsystem").style.display=="none"){
        ostype = $("#newdevoperatingsystem").val();
    }else{
        ostype = $("#newdevoperatingsystem1").val();
    }
	var softwarepackage = "";
	var reevaluate = "";
	var ipaddress = "";
	var deviceid = "";
	var hostname = $("#newhostnameid").val(); 
	var updateflag = "new";
	var mediatype = "";
	var portname = "";
	var managementip = "";
	if($("#newdevmanagementip").val() != "")
		managementip = $("#newdevmanagementip").val();
	if($("#newdevmanageaddress").val() != "")
		managementip += ":"+$("#newdevmanageaddress").val();
	var managementip2 = "";
	var auxiliary = "";
	if($("#newdevauxiliary").val() != "")
		auxiliary = $("#newdevauxiliary").val();
	if($("#newdevportaddress").val() != "")
		auxiliary += ":"+$("#newdevportaddress").val();
	var discoveryflag = "false";
	var exclusivity = "Exclusive"
	var xlocation = imgXPos;
	var ylocation = imgYPos;
	var powerstatus = "";
	var power = "0";
	var tftpipaddress = "";
	var tftphostname = "";
	var tftpimagepath = "";
	var tftpimagename = "";
	var tftpuser = "";
	var tftppassword = "";
	var tftpaddress = "";
	var tacacsipaddress = "";
	var tacacshostname = "";
	var radiushostname = "";
	var radiusipaddress = "";
	var radiususername = "";
	var radiuspassword = "";
	var description = $("#newdevdescription").val();
	var processor = "";
	var processorboardid = "";
	var manufacturer = "";
    if(document.getElementById("lablemanufacturer").style.display=="none"){
        manufacturer = $("#newdevmanufacturer").val();
    }else{
        manufacturer = $("#newdevmanufacturer1").val();
    }
	var serialnumber = "";
	var ios = "";
	var cpuspeed = "";
	var systemmemory = "";
	var nvramcf = "";
	var processormemory = "";
	var connectivitydone = "";
	var reachabilitydone = "";
	var convergencedone = "";
	var tftpserver = "";
	var tftpuser = "";
	var tftppassword = "";
	var ftpserver = "";
	var ftpuser = "";
	var ftppassword = "";
	var configdetail = "";
	var configfilepath = "";
	var configfilename = "";
	var configurl = "";
	var saveconfigurl = "";
	var configserver = "";
	var configdestination = "";
	var imagefilepath = "";
	var imagedetail = "";
	var imagefilename = "";
	var imageurl = "";
	var saveimageurl = "";
	var imageserver = "";
	var imagedestination = "";
	var saveimageenable = "false";
	var saveconfigenable = "false";
	var loadconfigenable = "false";
	var loadimageenable = "false";
	var saveimagedetail = "";
	var saveimageserver = "";
	var saveimagedestination = "";
	var saveimageuser = "";
	var saveimagepassword = "";
	var saveimagetype = "";
	var saveconfigdetail = "";
	var saveconfigserver = "";
	var saveconfigdestination = "";
	var saveconfiguser = "";
	var saveconfigpassword = "";
	var saveconfigtype = "";
	var saveconfigfilename = "";
	var saveimagefilename = "";
	var systemimagename = "";
	var systemconfigname = "";
	var savetypeimage = "";
	var typeimage = "";
	var savetypeconfig = "";
	var typeconfig = "";
	var chassispid = "";
	var chassisvid = "";
	var routeprocessorname = "";
	var totalmemory = "";
	var totalmemory2 = "";
	var routeprocessorname2 = "";
	var routeredundant = "";
	var routeprocessordescription = "";
	var routeprocessorproductid = "";
	var routeprocessorproductid2 = "";
	var routeprocessorversionid = "";
	var routeprocessorversionid2 = "";
	var embeddedredundant = "";
	var embeddedprocessorname = "";
	var embeddedprocessorname2 = "";
	var embeddedprocessordescription = "";
	var embeddedprocessorproductid = "";
	var embeddedprocessorproductid2 = "";
	var embeddedprocessorversionid = "";
	var embeddedprocessorversionid2 = "";
	var embeddedprocessornitrox = "";
	var embeddedprocessorocteon = "";
	var embeddedprocessornitrox2 = "";
	var embeddedprocessorocteon2 = "";
	var linecardname = "";
	var linecarddescription = "";
	var linecardproductid = "";
	var linecardversionid = "";
	var linecardnumber = "";
	var modulename = "";
	var moduledescription = "";
	var moduleproductid = "";
	var moduleversionid = "";
	var productfamily = "";
    if(document.getElementById("labelproductfamily").style.display=="none"){
        productfamily = $("#newdevproductfamily").val();
    }else{
        productfamily = $("#newdevproductfamily1").val();
    }
	var servertype = "";
	var managementinterface = $("#newdevmanageinterface").val();
	var managementinterface2 = "";
	var managementipmask = "";
	var managementipmask2 = "";
	var managementipv6 = "";
	var managementipv62 = "";
	var managementipv6prefix = "";
	var managementipv6prefix2 = "";
	var managementgatewayip = "";
	var processortype = "";
	var cpucores = "";
	var processorsockets = "";
	var corespersocket = "";
	var logicalprocessor = "";
	var consoleip = "";
	if($("#newdevconsoleip").val() != "")
		consoleip = $("#newdevconsoleip").val();
	if($("#newdevconsoleaddress").val() != "")
		consoleip += ":"+$("#newdevconsoleaddress").val();
	var titanname = "";
	var processorfamily = "";
	var processorpid = "";
	var consolenet = "";
	var ipv6 = "";
	var key = "";
	var admin = "";
	var access = "";
	var account = "";
	var accountport = "";
	var authenticationdirectory = "";
	var authenticationport = "";
	var behostlist = "";
	var configmethod = "";
	var configname = "";
	var configfile = "";
	var configpath = "";
	var cleartype = "";
	var coaport = "";
	var community = "";
	var connectivity = "";
	var databasename = "";
	var databasetablename = "";
	var databasetype = "";
	var defaultsm = "";
	var devicelist = "";
	var extensionip = "";
	var enablepassword = "";
	var features = "";
	var function1 = "";
	var logdirectory = "";
	var nrcmd = "";
	var nrcmdusername = "";
	var port = "";
	var redirectport = "";
	var redirectlogport = "";
	var rootdirectory = "";
	var serverdirectory = "";
	var vendortype = "";
	var snapshot = "";
	var domainname = $("#dropdowndomain").val();
	var application = "";
	var sequence = "";
	var rp0consoleip = "";
	var rp1consoleip = "";

	var JsonStr = '';
	JsonStr += '{"DEVICES": ['+'{ "DeviceName":"'+devicename+'","DeviceType":"'+devicetype+'","ObjectPath":"'+objectpath+'","Model":"'+model+'","DNDModelType":"'+dndmodeltype+'","SoftwareVersion":"'+softwareversion+'","OSVersion":"'+osversion+'","OSType":"'+ostype+'","SoftwarePackage":"'+softwarepackage+'","ReEvaluate":"'+reevaluate+'","IpAddress":"'+ipaddress+'","DeviceId":"'+deviceid+'","HostName":"'+hostname+'","UpdateFlag":"'+updateflag+'","MediaType":"'+mediatype+'","Portname":"'+portname+'","ManagementIp":"'+managementip+'","ManagementIp2":"'+managementip2+'","Auxiliary":"'+auxiliary+'","DiscoveryFlag":"'+discoveryflag+'","Exclusivity":"'+exclusivity+'","XLocation":"'+xlocation+'","YLocation":"'+ylocation+'","PowerStatus":"'+powerstatus+'","Power":"'+power+'","TftpIpAddress":"'+tftpipaddress+'","TftpHostname":"'+tftphostname+'","TftpImagePath":"'+tftpimagepath+'","TftpImageName":"'+tftpimagename+'","TftpUser":"'+tftpuser+'","TftpPassword":"'+tftppassword+'","TftpAddress":"'+tftpaddress+'","TacacsIpAddress":"'+tacacsipaddress+'","TacacsHostname":"'+tacacshostname+'","RadiusHostname":"'+radiushostname+'","RadiusIpAddress":"'+radiusipaddress+'","RadiusUsername":"'+radiususername+'","RadiusPassword":"'+radiuspassword+'","Description":"'+description+'","Processor":"'+processor+'","ProcessorBoardId":"'+processorboardid+'","Manufacturer":"'+manufacturer+'","SerialNumber":"'+serialnumber+'","IOS":"'+ios+'","CPUSpeed":"'+cpuspeed+'","SystemMemory":"'+systemmemory+'","NVRAMCF":"'+nvramcf+'","ProcessorMemory":"'+processormemory+'","ConnectivityDone":"'+connectivitydone+'","ReachabilityDone":"'+reachabilitydone+'","ConvergenceDone":"'+convergencedone+'","TFTPServer":"'+tftpserver+'","TFTPUser":"'+tftpuser+'","TFTPPassword":"'+tftppassword+'","FTPServer":"'+ftpserver+'","FTPUser":"'+ftpuser+'","FTPPassword":"'+ftppassword+'","ConfigDetail":"'+configdetail+'","ConfigFilePath":"'+configfilepath+'","ConfigFileName":"'+configfilename+'","ConfigUrl":"'+configurl+'","SaveConfigUrl":"'+saveconfigurl+'","ConfigServer":"'+configserver+'","ConfigDestination":"'+configdestination+'","ImageFilePath":"'+imagefilepath+'","ImageDetail":"'+imagedetail+'","ImageFileName":"'+imagefilename+'","ImageUrl":"'+imageurl+'","SaveImageUrl":"'+saveimageurl+'","ImageServer":"'+imageserver+'","ImageDestination":"'+imagedestination+'","SaveImageEnable":"'+saveimageenable+'","SaveConfigEnable":"'+saveconfigenable+'","LoadConfigEnable":"'+loadconfigenable+'","LoadImageEnable":"'+loadimageenable+'","SaveImageDetail":"'+saveimagedetail+'","SaveImageServer":"'+saveimageserver+'","SaveImageDestination":"'+saveimagedestination+'","SaveImageUser":"'+saveimageuser+'","SaveImagePassword":"'+saveimagepassword+'","SaveImageType":"'+saveimagetype+'","SaveConfigDetail":"'+saveconfigdetail+'","SaveConfigServer":"'+saveconfigserver+'","SaveConfigDestination":"'+saveconfigdestination+'","SaveConfigUser":"'+saveconfiguser+'","SaveConfigPassword":"'+saveconfigpassword+'","SaveConfigType":"'+saveconfigtype+'","SaveConfigFileName":"'+saveconfigfilename+'","SaveImageFileName":"'+saveimagefilename+'","SystemImageName":"'+systemimagename+'","SystemConfigName":"'+systemconfigname+'","SaveTypeImage":"'+savetypeimage+'","TypeImage":"'+typeimage+'","SaveTypeConfig":"'+savetypeconfig+'","TypeConfig":"'+typeconfig+'","ChassisPid":"'+chassispid+'","ChassisVid":"'+chassisvid+'","RouteProcessorName":"'+routeprocessorname+'","TotalMemory":"'+totalmemory+'","TotalMemory2":"'+totalmemory2+'","RouteProcessorName2":"'+routeprocessorname2+'","RouteRedundant":"'+routeredundant+'","RouteProcessorDescription":"'+routeprocessordescription+'","RouteProcessorProductId":"'+routeprocessorproductid+'","RouteProcessorProductId2":"'+routeprocessorproductid2+'","RouteProcessorVersionId":"'+routeprocessorversionid+'","RouteProcessorVersionId2":"'+routeprocessorversionid2+'","EmbeddedRedundant":"'+embeddedredundant+'","EmbeddedProcessorName":"'+embeddedprocessorname+'","EmbeddedProcessorName2":"'+embeddedprocessorname2+'","EmbeddedProcessorDescription":"'+embeddedprocessordescription+'","EmbeddedProcessorProductId":"'+embeddedprocessorproductid+'","EmbeddedProcessorProductId2":"'+embeddedprocessorproductid2+'","EmbeddedProcessorVersionId":"'+embeddedprocessorversionid+'","EmbeddedProcessorVersionId2":"'+embeddedprocessorversionid2+'","EmbeddedProcessorNitrox":"'+embeddedprocessornitrox+'","EmbeddedProcessorOcteon":"'+embeddedprocessorocteon+'","EmbeddedProcessorNitrox2":"'+embeddedprocessornitrox2+'","EmbeddedProcessorOcteon2":"'+embeddedprocessorocteon2+'","LineCardName":"'+linecardname+'","LineCardDescription":"'+linecarddescription+'","LineCardProductId":"'+linecardproductid+'","LineCardVersionId":"'+linecardversionid+'","LineCardNumber":"'+linecardnumber+'","ModuleName":"'+modulename+'","ModuleDescription":"'+moduledescription+'","ModuleProductId":"'+moduleproductid+'","ModuleVersionId":"'+moduleversionid+'","ProductFamily":"'+productfamily+'","ServerType":"'+servertype+'","ManagementInterface":"'+managementinterface+'","ManagementInterface2":"'+managementinterface2+'","ManagementIpMask":"'+managementipmask+'","ManagementIpMask2":"'+managementipmask2+'","ManagementIpv6":"'+managementipv6+'","ManagementIpv62":"'+managementipv62+'","ManagementIpv6Prefix":"'+managementipv6prefix+'","ManagementIpv6Prefix2":"'+managementipv6prefix2+'","ManagementGatewayIp":"'+managementgatewayip+'","ProcessorType":"'+processortype+'","CPUCores":"'+cpucores+'","ProcessorSockets":"'+processorsockets+'","CoresPerSocket":"'+corespersocket+'","LogicalProcessor":"'+logicalprocessor+'","ConsoleIp":"'+consoleip+'","TitanName":"'+titanname+'","ProcessorFamily":"'+processorfamily+'","ProcessorPId":"'+processorpid+'","ConsoleNet":"'+consolenet+'","Ipv6":"'+ipv6+'","Key":"'+key+'","Admin":"'+admin+'","Access":"'+access+'","Account":"'+account+'","AccountPort":"'+accountport+'","AuthenticationDirectory":"'+authenticationdirectory+'","AuthenticationPort":"'+authenticationport+'","BEHostlist":"'+behostlist+'","ConfigMethod":"'+configmethod+'","ConfigName":"'+configname+'","ConfigFile":"'+configfile+'","ConfigPath":"'+configpath+'","ClearType":"'+cleartype+'","COAPort":"'+coaport+'","Community":"'+community+'","Connectivity":"'+connectivity+'","DatabaseName":"'+databasename+'","DatabaseTableName":"'+databasetablename+'","DatabaseType":"'+databasetype+'","DefaultSM":"'+defaultsm+'","DeviceList":"'+devicelist+'","ExtensionIp":"'+extensionip+'","EnablePassword":"'+enablepassword+'","Features":"'+features+'","Function":"'+function1+'","LogDirectory":"'+logdirectory+'","NRCMD":"'+nrcmd+'","NRCMDUsername":"'+nrcmdusername+'","Port":"'+port+'","RedirectPort":"'+redirectport+'","RedirectLogPort":"'+redirectlogport+'","RootDirectory":"'+rootdirectory+'","ServerDirectory":"'+serverdirectory+'","VendorType":"'+vendortype+'","Snapshot":"'+snapshot+'","DomainName":"'+domainname+'","Application":"'+application+'","Sequence":"'+sequence+'","RP0ConsoleIp":"'+rp0consoleip+'","RP1ConsoleIp":"'+rp1consoleip+'"';
	GlobalNewDevice = [];
	/*Port and Port Map variables*/
	var physicalporttype = "";
	var type = "";
	var speed = "";
	var objectpath = "";
	var portname = "";
	var portmap = "";
	var portnameid = "";
	/*Slot variables*/
	var slots = "";
    if (globalStructure == "devport"){
        JsonStr += ',"DEVICE":[],"PORT":[] }]}';
		GlobalNewDevice.push($.parseJSON(JsonStr));
		var device = setNewDeviceInfoNode();
		GlobalNewDevice[0].DEVICES[0].DEVICE.push(device);	
		for(var i = 0; i < devPortInfoArray.length; i++){
			physicalporttype = $("#dropdownphysicalporttype").val();
			type = "untagged";
			speed = physicalPortTypeSpeed(physicalporttype);
			objectpath = "Device_"+deviceCtr+".Port_"+i
			portnameid = devPortInfoArray[i].PortName
			portnameid = portnameid.split("_");
			portname = portnameid[0]
			portmap = [1]
			ports = setNewPortNode(physicalporttype,type,speed,objectpath,portname,"new","false",portmap);
			GlobalNewDevice[0].DEVICES[0].PORT.push(ports);
		}
    }else if(globalStructure =="devslotport" ){
		JsonStr += ',"DEVICE":[],"SLOT":[] }]}';
		GlobalNewDevice.push($.parseJSON(JsonStr));
		var device = setNewDeviceInfoNode();
		var object = 0;
		GlobalNewDevice[0].DEVICES[0].DEVICE.push(device);
		var num = $("#portperdevice").val();
		num--
		for(var i = 0; i <= num; i++){
			object = ".Slot_"+i	
			slots = setNewSlotNode(object,i);
		}
    }else if(globalStructure =="devmodport" ){
		JsonStr += ',"DEVICE":[],"MODULE":[] }]}';
		GlobalNewDevice.push($.parseJSON(JsonStr));
		var device = setNewDeviceInfoNode();
		GlobalNewDevice[0].DEVICES[0].DEVICE.push(device);
		var num = $("#portperdevice").val();
		num--
		for(var i = 0; i <= num; i++){
			object = ".Module_"+i
			modules = setNewModuleNode(object,i);
		}
	}else if(globalStructure =="devslotmod" ){
		JsonStr += ',"DEVICE":[],"SLOT":[] }]}';
		GlobalNewDevice.push($.parseJSON(JsonStr));
		var device = setNewDeviceInfoNode();
		GlobalNewDevice[0].DEVICES[0].DEVICE.push(device);
		var num = $("#portperdevice").val();
		num-- 
		for(var i = 0; i <= num; i++){
			 object = ".Slot_"+i
			slots = setNewSlotNode(object,i);
		}
	}else{
		JsonStr += ',"DEVICE":[],"RACK":[] }]}';
		GlobalNewDevice.push($.parseJSON(JsonStr));
		var device = setNewDeviceInfoNode();
		GlobalNewDevice[0].DEVICES[0].DEVICE.push(device);
		var dev = "Device_"+deviceCtr;
		createNewJSONforRack(dev);
	}
	return GlobalNewDevice 
}
 /*
 *  FUNCTION NAME : createNewJSONforRack
 *  AUTHOR        : marlo agapay
 *  DATE          : March 22, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createNewJSONforRack(dev){
	for (var a=0; a<arrRackCount.length; a++){
		var Number =a;
		var ObjectPath = dev+"."+"Rack_"+a
		var RackDevName = dev;
		var UpdateFlag = "new";
		var rackId = arrRackCount[a].RackId;
		 var rack = setNewRackNode(Number,ObjectPath,RackDevName,UpdateFlag,rackId);	
//		GlobalNewDevice[0].DEVICES[0].RACK.push(rack);
	}
}
 /*
 *  FUNCTION NAME : setNewDeviceMAINCONFIG
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating MAINCONFIG node
 *  PARAMETERS    : 
 *
 */
function setNewDeviceMAINCONFIG(domain){
	var structure = $("#dropdownstruction").val();
    DomainName = ResourceDomain;
    ZoneName = 'Default';
	var JsonStr ='';
	JsonStr += '{"MAINCONFIG": ['+'{ "Name":"","RtmId":"","AllowLoad":"","lagMenu":"",';
	JsonStr += '"AttributeId":"","Reevaluate":"","DateEdit":"","Power":"","UserName":"'+globalUserName+'",';
	JsonStr += '"ResourceId":"","TftpIpAddress":"","DebugId":"","TftpImagePath":"",';
	JsonStr += '"MainId":"","TftpImageName":"","MainConfigurationUserId":"",';
	JsonStr += '"Description":"","TimeEdit":"","Id":"","DEVICES":[] }]}';		
	GlobalNewDevice = [];
	GlobalNewDevice.push($.parseJSON(JsonStr));
	var devices = setNewDevicesNode(domain);
	GlobalNewDevice[0].MAINCONFIG[0].DEVICES.push(devices);
	var devicenode = getDeviceInfoNode(domain)
	GlobalNewDevice[0].MAINCONFIG[0].DEVICES[0].DEVICE.push(devicenode);
	globalStructure = structure
	if(structure=="devport"){
		for(var i = 0; i < devPortInfoArray.length; i++){
			setNewPortNode(portresid,availability,number,pyhicalporttype,portname,partnerport,exclusivity,porttype,ethmode,subchanel)
		}
	}
	return JsonStr
}
 /*
 *  FUNCTION NAME : setNewDeviceInfoNode
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating DEVICE node
 *  PARAMETERS    : 
 *
 */

function setNewDeviceInfoNode(){
    var devicetype = $("#dropdowndevicetype").val();
    var fusioncard = "";
    var portview = "";
    var loopbackaddress = "";
    var breakout = "";
    var discovery = "";
    var username = $("#newdevusername").val();
    var redflag = "";
    var esxiusername = "";
    var embeddedprocessor = "";
    var password = $("#newdevpassword").val();
    var linecard = "";
    var esxipassword = "";
    var routeprocessor = "";
    var exactipadd = "";
    var objectpath = "Device_"+deviceCtr
    var application = "";
    var status = "";
    var prototypeflag = "false";
    var devicename = "";
    var switchport = "";
    var devname = "Device_"+deviceCtr
    var mapname = "";
    var deviceid = "";
    var controllerinfo = "";
    var modeltype = "";
	if(document.getElementById("labelmodel").style.display=="none"){
		modeltype = $("#newdevmodel").val();
	}else{	
		modeltype = $("#newdevmodel1").val();
	}
    var taghfr = "";
    var dndmodeltype = "AddDevice";
    var tagena = "";
    var deviceresid = "";
    var tagclassic = "";
    var macaddress = "";
    var tagmc = "";
    var deviceflag = "";
    var tagtype = "";
    var dbresid = "";
    var earmsname = "";
    var connectivitytype = "";
    var nataddress = "";
    var portspeed = "";
    var pieurl = "";
    var portbandwidth = "";
    var pieenable = "";
    var exacthostname = "";
    var chassisaddress = "";
    var fusion = "";
    var loadflag = "";
    var checkconnectivity = "";
    var connectivityflag = "";
    var reachability = "";
    var reachabilityflag = "";
    var convergenceflag = "";


	var JsonStr = '';
	JsonStr += '{"DeviceType":"'+devicetype+'","FusionCard":"'+fusioncard+'","PortView":"'+portview+'","LoopBackAddress":"'+loopbackaddress+'","Breakout":"'+breakout+'","Discovery":"'+discovery+'","Username":"'+username+'","RedFlag":"'+redflag+'","ESXIUsername":"'+esxiusername+'","EmbeddedProcessor":"'+embeddedprocessor+'","Password":"'+password+'","LineCard":"'+linecard+'","ESXIPassword":"'+esxipassword+'","RouteProcessor":"'+routeprocessor+'","ExactIpAdd":"'+exactipadd+'","ObjectPath":"'+objectpath+'","Application":"'+application+'","Status":"'+status+'","ProtoTypeFlag":"'+prototypeflag+'","DeviceName":"'+devicename+'","SwitchPort":"'+switchport+'","DevName":"'+devname+'","MapName":"'+mapname+'","DeviceId":"'+deviceid+'","ControllerInfo":"'+controllerinfo+'","ModelType":"'+modeltype+'","TagHfr":"'+taghfr+'","DNDModelType":"'+dndmodeltype+'","TagEna":"'+tagena+'","DeviceResId":"'+deviceresid+'","TagClassic":"'+tagclassic+'","MacAddress":"'+macaddress+'","TagMC":"'+tagmc+'","DeviceFlag":"'+deviceflag+'","TagType":"'+tagtype+'","DBResId":"'+dbresid+'","EarmsName":"'+earmsname+'","ConnectivityType":"'+connectivitytype+'","NATAddress":"'+nataddress+'","PortSpeed":"'+portspeed+'","PieURL":"'+pieurl+'","PortBandWidth":"'+portbandwidth+'","PieEnable":"'+pieenable+'","ExactHostName":"'+exacthostname+'","ChassisAddress":"'+chassisaddress+'","Fusion":"'+fusion+'","LoadFlag":"'+loadflag+'","CheckConnectivity":"'+checkconnectivity+'","ConnectivityFlag":"'+connectivityflag+'","Reachability":"'+reachability+'","ReachabilityFlag":"'+reachabilityflag+'","ConvergenceFlag":"'+convergenceflag+'"}';
	var parseJ = $.parseJSON(JsonStr);
	return parseJ
}

 /*
 *  FUNCTION NAME : setNewSlotNode
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating slot node
 *  PARAMETERS    : 
 *
 */
function setNewSlotNode(object,count,slotId,slotObjectPath,racknum){
    var modeltype = "";
    var moduledescription = "";
    var redflag = "";
    var slotname = "";
    var subchannel = "";
    var productnumber = "";
    var serialnumber = "";
    var boardtype = "";
    var slotid = "";
    var updateflag = "new";
    var slotdeviceid = "";
	var port = "";
	if(globalStructure =="devslotport"){
   		var number = GlobalSlotID;
    	var slotdevname = "Device_"+deviceCtr;
   		var objectpath = "Device_"+deviceCtr;
	}else if(globalStructure=="devslotmod"){
		var number = count;
		var slotdevname = "Device_"+deviceCtr+object;
		var objectpath = "Device_"+object;
	}else{
   		var number = count;
    	var slotdevname = object;
   		var objectpath = slotObjectPath;
	}
	var JsonStr = '';
	JsonStr += '{"Number":"'+number+'","ModelType":"'+modeltype+'","ModuleDescription":"'+moduledescription+'","RedFlag":"'+redflag+'","SlotName":"'+slotname+'","SlotDevName":"'+slotdevname+'","SubChannel":"'+subchannel+'","ProductNumber":"'+productnumber+'","ObjectPath":"'+objectpath+'","SerialNumber":"'+serialnumber+'","BoardType":"'+boardtype+'","SlotId":"'+slotid+'","UpdateFlag":"'+updateflag+'","SlotDeviceId":"'+slotdeviceid+'"';
	if(globalStructure =="devslotport"){
		JsonStr += ',"PORT":[] }';
	}else{
		JsonStr += ',"MODULE":[] }';
	}
	var parseJ = $.parseJSON(JsonStr);
	var portid = "";
	var newportid = "";
	var physicalporttype = "";
	var type = "";		
	var speed = "";
	var objectpath = "";
	var portname = "";
	var portmap = "";
	var portnameid = "";
	/*Module var*/
	var modules = "";
	var moduleid = "";
	if(globalStructure =="devslotport"){
		GlobalNewDevice[0].DEVICES[0].SLOT.push(parseJ);
		var portcount = arrSlotCount[count].Value
		portcount--
		for(var i = 0; i <= portcount; i++){		
			portid = "Slot"+count+"_Port"+i
			pysicalport = arrSlotCount[count].PhysicalPortType
			for(var x = 0; x < devPortInfoArray.length; x++){
				newportid = devPortInfoArray[x].PortId
				if(newportid==portid){
					type = "untagged"; 
					speed = physicalPortTypeSpeed(physicalporttype);
					objectpath = "Device_"+deviceCtr+".Slot_"+count+"Port_"+x
					portnameid = devPortInfoArray[x].PortName
					portnameid = portnameid.split("_");
					portname = portnameid[0]
					portmap = portnameid[1]
					ports = setNewPortNode(physicalporttype,type,speed,objectpath,portname,"new","false",portmap);
					GlobalNewDevice[0].DEVICES[0].SLOT[count].PORT.push(ports);
				}
			}
		}
	}else if(globalStructure == "devslotmod"){
		GlobalNewDevice[0].DEVICES[0].SLOT.push(parseJ);
		var modulecount = arrSlotCount[count].Value	
		modulecount--
		for(var i = 0; i <= modulecount; i++){
			moduleid = "Slot"+count+"_Module"+i
			modules = setNewModuleNode(moduleid,i,count);
		}
	}else if(globalStructure == "devrackslotport"){
		GlobalNewDevice[0].DEVICES[0].RACK[racknum].SLOT.push(parseJ);
		var slotValue = "";
		for(var x=0; x<arrSlotCount.length; x++){
			if(arrSlotCount[x].SlotId == "Rack"+racknum+"_Slot"+count){
				var modulecount = arrSlotCount[x].Value
				modulecount--
				for(var i = 0; i <= modulecount; i++){
					moduleid = "Rack"+racknum+"_Slot"+count+"_Module"+i
					modules = setNewModuleNode(moduleid,i,count,racknum);
				}
			}
		}
	}else{
		GlobalNewDevice[0].DEVICES[0].SLOT.push(parseJ);	
		var slotValue = "";
		for(var a=0; a<arrSlotCount.length; a++){
			if(arrSlotCount[a].SlotId == slotObjectPath){
				slotValue = arrSlotCount[a].Value;	
			}
		}									
		
	}
	GlobalSlotID++;
	return parseJ
}

/*
 *
 *  FUNCTION NAME : setNewPortNode
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating PORT Node
 *  PARAMETERS    : 
 *
 */
function setNewPortNode(physicalporttype,type,speed,objectpath,portname,updateflag,subchannel,portmap){
    var exclusivity = "";
    var mediatype = "";
    var portpreiosena = "";
    var redflag = "";
    var portcheck = "";
    var portcard = "";
    var partnerportdevice = "";
    var ethmode = "";
    var partnerinformation = "";
    var switchinfo = "";
    var saveconnectivity = "";
    var vlanname = "";
    var speed2 = "";
    var description = "";
    var vlanid = "";
    var portflag = "";
    var portpreena = "";
    var availability = "";
    var portpreioshfr = "";
    var portslotid = "";
    var portid = "";
    var subnet = "";
    var licenseenabled = "";
    var revmask = "";
    var partnerport = "";
    var netid = "";
    var portsequence = "";
    var fusion = "";
    var fusionport = "";
    var address = "";
    var fusioncard = "";
    var prevport = "";
    var ipv6subnet = "";
    var bandwidth = "";
    var ipv6address = "";
    var ipv6netid = "";
    var portpostiosena = "";
    var portpostena = "";
    var portpostmodel = "";
    var portconfig = "";
    var portpostiosclassic = "";
    var portpostmc = "";
    var enableport = "";
    var phy = "";
    var portposthfr = "";
    var tunnelservicespic = "";
    var portpreiosclassic = "";
    var sequence = "";
    var multiservicespic = "";
    var spa = "";
    var number = "";
    var porttype = "";
    var portresid = "";
    var carriercard = "";
    var autonegotiation = "";
    var switchportinfo = "";
    var duplexity = "";


	var JsonStr = '';
	JsonStr += '{ "Exclusivity":"'+exclusivity+'","MediaType":"'+mediatype+'","PortPreIosEna":"'+portpreiosena+'","RedFlag":"'+redflag+'","PortCheck":"'+portcheck+'","PortCard":"'+portcard+'","PartnerPortDevice":"'+partnerportdevice+'","EthMode":"'+ethmode+'","PartnerInformation":"'+partnerinformation+'","SwitchInfo":"'+switchinfo+'","SaveConnectivity":"'+saveconnectivity+'","VlanName":"'+vlanname+'","Speed2":"'+speed2+'","Description":"'+description+'","VlanId":"'+vlanid+'","PortFlag":"'+portflag+'","PortPreEna":"'+portpreena+'","Availability":"'+availability+'","PortPreIosHfr":"'+portpreioshfr+'","PortSlotId":"'+portslotid+'","PortId":"'+portid+'","Subnet":"'+subnet+'","PhysicalPortType":"'+physicalporttype+'","LicenseEnabled":"'+licenseenabled+'","RevMask":"'+revmask+'","Type":"'+type+'","PartnerPort":"'+partnerport+'","NetId":"'+netid+'","PortSequence":"'+portsequence+'","Fusion":"'+fusion+'","FusionPort":"'+fusionport+'","Address":"'+address+'","FusionCard":"'+fusioncard+'","PrevPort":"'+prevport+'","Ipv6SubNet":"'+ipv6subnet+'","Bandwidth":"'+bandwidth+'","Ipv6Address":"'+ipv6address+'","Ipv6NetId":"'+ipv6netid+'","Speed":"'+speed+'","PortPostIosEna":"'+portpostiosena+'","PortPostEna":"'+portpostena+'","ObjectPath":"'+objectpath+'","PortPostModel":"'+portpostmodel+'","PortConfig":"'+portconfig+'","PortPostIosClassic":"'+portpostiosclassic+'","PortPostMc":"'+portpostmc+'","EnablePort":"'+enableport+'","Phy":"'+phy+'","PortPostHfr":"'+portposthfr+'","TunnelServicesPIC":"'+tunnelservicespic+'","PortPreIosClassic":"'+portpreiosclassic+'","Sequence":"'+sequence+'","PortName":"'+portname+'","MultiServicesPIC":"'+multiservicespic+'","Spa":"'+spa+'","Number":"'+number+'","PortType":"'+porttype+'","UpdateFlag":"'+updateflag+'","SubChannel":"'+subchannel+'","PortResId":"'+portresid+'","CarrierCard":"'+carriercard+'","AutoNegotiation":"'+autonegotiation+'","SwitchPortInfo":"'+switchportinfo+'"';
	if(portmap=="0")
		JsonStr += ',"Duplexity":"'+duplexity+'" }';
	else
		JsonStr += ',"Duplexity":"'+duplexity+'","PORTMAP":[] }';
	var parseJ = $.parseJSON(JsonStr);
	var maps = savePortMapStructure(portmap);	
	parseJ.PORTMAP.push(maps);
	return parseJ
}

/*
 *
 *  FUNCTION NAME : setNewRackNode 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          :	March 15, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Ceate for rack node json
 *  PARAMETERS    : 
 *	MODIFICATION  : 
 */
function setNewRackNode(Number,ObjectPath,RackDevName,UpdateFlag,rackId){
    var rackid = "";
    var modeltype = "";
    var ios = "";
    var mapname = "";
    var boardtype = "";
    var moduledescription = "";
    var rackname = "";
    var subchannel = "";
    var rackdeviceid = "";
    var hwversion = "";
    var orangeflag = "";
    var rackdevname = RackDevName;
    var objectpath = ObjectPath;
    var serialnumber = "";
    var redflag = "";
    var productnumber = "";
    var number = Number;
    var updateflag = UpdateFlag;
    var portgroupsize = "";
    var swversion = "";

	var JsonStr = '';
	JsonStr += '{"RackId":"'+rackid+'","ModelType":"'+modeltype+'","Ios":"'+ios+'","MapName":"'+mapname+'","BoardType":"'+boardtype+'","ModuleDescription":"'+moduledescription+'","RackName":"'+rackname+'","SubChannel":"'+subchannel+'","RackDeviceId":"'+rackdeviceid+'","HwVersion":"'+hwversion+'","OrangeFlag":"'+orangeflag+'","RackDevName":"'+rackdevname+'","ObjectPath":"'+objectpath+'","SerialNumber":"'+serialnumber+'","RedFlag":"'+redflag+'","ProductNumber":"'+productnumber+'","Number":"'+number+'","UpdateFlag":"'+updateflag+'","PortGroupSize":"'+portgroupsize+'","SwVersion":"'+swversion+'"';	
	JsonStr += ',"SLOT":[] }'; 
	var parseJ = $.parseJSON(JsonStr); 
	GlobalNewDevice[0].DEVICES[0].RACK.push(parseJ);
	var arrRack_SlotCount = 0;
	var rackvalue  = "";
	for(var q=0; q<arrSlotCount.length; q++){
		var split = arrSlotCount[q].SlotId.split("_");
		if (split[0] == rackId){
			arrRack_SlotCount++;
		}
	}
	for(var a=0;a<arrRack_SlotCount; a++){
		var slotId = RackDevName+"_"+rackId+"_"+"Slot"+a;
		var slotObjectPath = ObjectPath+"."+"Slot_"+a;
		rackvalue = setNewSlotNode(ObjectPath,a,slotId,slotObjectPath,Number);
	}
//	return parseJ;
}
/*
 *
 *  FUNCTION NAME : setNewModuleNode 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          :	March 15, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Ceate for rack node json
 *  PARAMETERS    : 
 *	MODIFICATION  : 
 */
function setNewModuleNode(object,count,num,racknum){
    var number = GlobalPortIP; 
    var modulename = "";
    var redflag = "";
    var moduledescription = "";
    var subchannel = "";
    var moduleid = "";
    var serialnumber = "";
	if(globalStructure == "devrackslotport"){
		var moduledevname = "Device_"+deviceCtr+".Rack_"+racknum+".Slot_"+num;
		var objectpath = "Device_"+deviceCtr+".Rack_"+racknum+".Slot_"+num+".Module_"+count;
	}else{
    	var objectpath = "Device_"+deviceCtr;
    	var moduledevname = "Device_"+deviceCtr+".Module_"+count;
	}
    var moduleresid = "";
    var updateflag = "new";
    var moduleslotid = "";

	var JsonStr = '';
	JsonStr += '{ "Number":"'+number+'","ModuleName":"'+modulename+'","RedFlag":"'+redflag+'","ModuleDescription":"'+moduledescription+'","SubChannel":"'+subchannel+'","ObjectPath":"'+objectpath+'","ModuleId":"'+moduleid+'","SerialNumber":"'+serialnumber+'","ModuleDevName":"'+moduledevname+'","ModuleResId":"'+moduleresid+'","UpdateFlag":"'+updateflag+'","ModuleSlotId":"'+moduleslotid+'"';
	JsonStr += ',"PORT":[] }';
	var parseJ = $.parseJSON(JsonStr);
	var physicalporttype = "";
	var type = "";		
	var speed = "";
	var objectpath = "";
	var portname = "";
	var portmap = "";
	var portnameid = "";
	if(globalStructure == "devslotmod"){
		GlobalNewDevice[0].DEVICES[0].SLOT[num].MODULE.push(parseJ);
		var portcount = arrModuleCount[num].Value
	}else if(globalStructure == "devrackslotport"){
		GlobalNewDevice[0].DEVICES[0].RACK[racknum].SLOT[num].MODULE.push(parseJ);
		var portcount = arrModuleCount[num].Value
	}else{
		GlobalNewDevice[0].DEVICES[0].MODULE.push(parseJ);
		var portcount = arrModuleCount[count].Value
	}
	portcount--
	for(var i = 0; i <= portcount; i++){
		if(globalStructure == "devslotmod"){
			portid = "Slot"+num+"_Module"+count+"_Port"+i
		}else if(globalStructure == "devrackslotport"){
			portid = "Rack"+racknum+"_Slot"+num+"_Module"+count+"_Port"+i
		}else{
			portid = "Module"+count+"_Port"+i
		}
		pysicalport = arrModuleCount[count].PhysicalPortType
		for(var x = 0; x < devPortInfoArray.length; x++){
			newportid = devPortInfoArray[x].PortId
			if(newportid==portid){
				type = "untagged";
				speed = physicalPortTypeSpeed(physicalporttype);
				objectpath = "Device_"+deviceCtr+".Module_"+count+"Port_"+x
				portnameid = devPortInfoArray[x].PortName
				portnameid = portnameid.split("_");
				portname = portnameid[0]
				portmap = portnameid[1]
				ports = setNewPortNode(physicalporttype,type,speed,objectpath,portname,"new","false",portmap);
				if(globalStructure == "devslotmod"){
					GlobalNewDevice[0].DEVICES[0].SLOT[num].MODULE[count].PORT.push(ports);
				}else if(globalStructure == "devrackslotport"){
					GlobalNewDevice[0].DEVICES[0].RACK[racknum].SLOT[num].MODULE[count].PORT.push(ports);
				}else{
					GlobalNewDevice[0].DEVICES[0].MODULE[count].PORT.push(ports);
				}
			}
		}
	}
	GlobalPortIP++
	return parseJ;
	
}
/*
 *
 *  FUNCTION NAME : getDeviceInfoNode 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          :	March 15, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Ceate for rack node json
 *  PARAMETERS    : 
 *	MODIFICATION  : 
 */

function getDeviceInfoNode(domain){
	var deviceId = "";//ask for ID
	if(document.getElementById("labelmodel").style.display=="none"){
		var modeltype = $("#newdevmodel").val();
	}else{
		var modeltype = $("#newdevmodel1").val();
	}
	var devicename = $("#newhostnameid").val();
	var devicetype = $("#dropdowndevicetype").val();
	var deviceflag = "1";
	var connectivity = getNewPortCount();
	var discovery = "Manual";
	var prototypeflag = "false";//Not sure, ask if the core is ready
	var devicenode = setNewDeviceInfoNode(deviceId,modeltype,devicename,devicetype,deviceflag,connectivity,discovery,domain,prototypeflag);
	return devicenode
}
/*
 *
 *  FUNCTION NAME : getNewPortCount 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          :	March 15, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Get port count
 *  PARAMETERS    : 
 *	MODIFICATION  : 
 */
function getNewPortCount(){
	var porttype = "";
	var L1 = 0;var L2 = 0;var Open = 0;var direct = 0;
	for(var i = 0; i < devPortInfoArray.length; i++){
		porttype = devPortInfoArray[i].PortTypeInfo
		porttype.toLowerCase();
		if(porttype=="l1")
			L1++
		else if(porttype=="l2")
			L2++
		else if(porttype=="open port")
			Open++
		else
			direct++
	}
	var connectivity = 'L1="'+L1+'",L2="'+L2+'",Open="'+Open+'"Direct="'+direct+'"';
	return connectivity
}
/*
 *
 *  FUNCTION NAME : savePortMapStructure
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          :	March 15, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : port map json
 *  PARAMETERS    : 
 *	MODIFICATION  : 
 */
function savePortMapStructure(portmap){
	var JsonStr = ''; 
	JsonStr += '{"PortId":"'+portmap+'"}';
	var parseJ = $.parseJSON(JsonStr); 
	return parseJ
}
/*
 *
 *  FUNCTION NAME : physicalPortTypeSpeed
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          :	March 15, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *	MODIFICATION  : 
 */
function physicalPortTypeSpeed(physicalporttype){
	var speed = "";
	if(physicalporttype=="ATM"){
		speed = "1000";
	}else if(physicalporttype=="Ethernet"){
		speed = "1000";
	}else if(physicalporttype=="GigabitEhernet"){
		speed = "1000";
	}else if(physicalporttype=="TenGigabitEthernet"){
		speed = "10000";
	}else if(physicalporttype=="FortyGigabitEthernet"){
		speed = "40000";
	}else if(physicalporttype=="HundredGigabitEthernet"){
		speed = "100000";
	}else if(physicalporttype=="POS"){
		speed = "1000";
	}else if(physicalporttype=="Serial"){
		speed = "1000"; 
	}else{
		speed = "1000";
	}
	return speed
}

// difine Hash table
function Hash() {
	this.length = 0;
	this.items = new Array();
	for (var i = 0; i < arguments.length; i += 2) {
		if (typeof (arguments[i + 1]) != 'undefined') {
			this.items[arguments[i]] = arguments[i + 1];
			this.length++;
		}
	}

	this.removeItem = function(in_key) {
		var tmp_previous;
		if (typeof (this.items[in_key]) != 'undefined') {
			this.length--;
			tmp_previous = this.items[in_key];
			delete this.items[in_key];
		}

		return tmp_previous;
	};

	this.getItem = function(in_key) {
		return this.items[in_key];
	};

	this.add = function(in_key, in_value) {
		var tmp_previous;
		if (typeof (in_value) != 'undefined') {
			if (typeof (this.items[in_key]) == 'undefined') {
				this.length++;
			} else {
				tmp_previous = this.items[in_key];
			}

			this.items[in_key] = in_value;
		}

		return tmp_previous;
	};

	this.hasItem = function(in_key) {
		return typeof (this.items[in_key]) != 'undefined';
	};

	this.clear = function() {
		for ( var i in this.items) {
			delete this.items[i];
		}

		this.length = 0;
	};
}

//////////////////////////////////////////////////////
// Class EmoEngine using Singleton Pattern

var EmoEngine = new function EmoEngine() {
	if (EmoEngine.initialized)
		throw new Error('You may not instantiate EmoEngine');

	var aInstance = this;
	EmoEngine.instance = function() {
		return aInstance;
	};
	return EmoEngine;
};

EmoEngine.initialized = true;
//EmoEngine.prototype.hEvent;// = EdkDll.EE_EmoEngineEventCreate();
//EmoEngine.prototype.hData;
EmoEngine.prototype.ES_List = new Hash();

EmoEngine.prototype.ProcessEvents = function() {
	ProcessEvents(0);
};

EmoEngine.prototype.ProcessEvents = function(maxTimeMilliseconds) {
	var start = new Date();
	while (EdkDll.EE_EngineGetNextEvent() == EdkDll.EDK_OK) //edit remove this.hEvent
	{
		var stop = new Date();
		if (maxTimeMilliseconds != 0) {
			var elapsedMilliseconds = stop.getTime() - start.getTime();
			if (elapsedMilliseconds >= maxTimeMilliseconds) {
				console.log('broken')
				break;
			}
		}
		var userId;
		userId = EdkDll.EE_EmoEngineEventGetUserId(); //edit remove this.hEvent
		var eventType = EdkDll.EE_EmoEngineEventGetType(); //edit remove this.hEvent

		switch (eventType) {
		case EdkDll.EE_Event_t.EE_UserAdded:
			this.OnUserAdded(userId);
			break;
		case EdkDll.EE_Event_t.EE_UserRemoved:
			this.OnUserRemoved(userId);
			break;
		case EdkDll.EE_Event_t.EE_EmoStateUpdated:
			var curEmoState = new EmoState(); //Create a object EmoState ()
			EdkDll.EE_EmoEngineEventGetEmoState(); //edit remove this.hEvent ...
			EmoEngine.errorHandler(EdkDll.EE_GetError()); //errorhandler
			this.OnEmoStateUpdated(userId, curEmoState);
			this.OnEmoEngineEmoStateUpdated(userId, curEmoState);
			if (!curEmoState.EmoEngineEqual()) {
				this.OnEmoEngineEmoStateUpdated(userId, curEmoState);
			}
			if (!curEmoState.ExpressivEqual()) {
				this.OnExpressivEmoStateUpdated(userId, curEmoState);
			}
			if (!curEmoState.AffectivEqual()) {
				this.OnAffectivEmoStateUpdated(userId, curEmoState);
			}
			if (!curEmoState.CognitivEqual()) {
				this.OnCognitivEmoStateUpdated(userId, curEmoState);
			}
			break;
		case EdkDll.EE_Event_t.EE_CognitivEvent:
			var cogType = EdkDll.EE_CognitivEventGetType(); //remove this.hEvent
			switch (cogType) {
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingStarted:
				this.OnCognitivTrainingStarted(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingSucceeded:
				this.OnCognitivTrainingSucceeded(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingFailed:
				this.OnCognitivTrainingFailed(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingCompleted:
				this.OnCognitivTrainingCompleted(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingDataErased:
				this.OnCognitivTrainingDataErased(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingRejected:
				this.OnCognitivTrainingRejected(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivTrainingReset:
				this.OnCognitivTrainingReset(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivAutoSamplingNeutralCompleted:
				this.OnCognitivAutoSamplingNeutralCompleted(userId);
				break;
			case EdkDll.EE_CognitivEvent_t.EE_CognitivSignatureUpdated:
				this.OnCognitivSignatureUpdated(userId);
				break;
			default:
				break;
			}
			break;
		case EdkDll.EE_Event_t.EE_ExpressivEvent:
			var expEvent = EdkDll.EE_ExpressivEventGetType(); //remove this.hEvent
			switch (expEvent) {
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingStarted:
				this.OnExpressivTrainingStarted(userId);
				break;
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingSucceeded:
				this.OnExpressivTrainingSucceeded(userId);
				break;
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingFailed:
				this.OnExpressivTrainingFailed(userId);
				break;
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingCompleted:
				this.OnExpressivTrainingCompleted(userId);
				break;
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingDataErased:
				this.OnExpressivTrainingDataErased(userId);
				break;
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingRejected:
				this.OnExpressivTrainingRejected(userId);
				break;
			case EdkDll.EE_ExpressivEvent_t.EE_ExpressivTrainingReset:
				this.OnExpressivTrainingReset(userId);
				break;
			default:
				break;
			}
			break;
		case EdkDll.EE_Event_t.EE_InternalStateChanged:
			this.OnInternalStateChanged(userId);
			break;
		default:
			break;
		}
	}
};

EmoEngine.prototype.IProcessEvents = function(maxTimeMilliseconds) {
	var start = new Date();

	while (EdkDll.IEE_EngineGetNextEvent() == EdkDll.EDK_OK) //edit remove this.hEvent
	{
		var stop = new Date();
		if (maxTimeMilliseconds != 0) {
			var elapsedMilliseconds = stop.getTime() - start.getTime();
			if (elapsedMilliseconds >= maxTimeMilliseconds) {
				break;
			}
		}
		var userId;
		userId = EdkDll.IEE_EmoEngineEventGetUserId(); //edit remove this.hEvent
		var eventType = EdkDll.IEE_EmoEngineEventGetType(); //edit remove this.hEvent

		switch (eventType) {
		case EdkDll.IEE_Event_t.IEE_UserAdded:
			this.OnUserAdded(userId);
			break;
		case EdkDll.IEE_Event_t.IEE_UserRemoved:
			this.OnUserRemoved(userId);
			break;
		case EdkDll.IEE_Event_t.IEE_EmoStateUpdated:
			var curEmoState = new EmoState(); //Create a object EmoState ()
			EdkDll.IEE_EmoEngineEventGetEmoState(); //edit remove this.hEvent ...
			EmoEngine.errorHandler(EdkDll.EE_GetError()); //errorhandler
			this.OnEmoStateUpdated(userId, curEmoState);
			this.OnEmoEngineEmoStateUpdated(userId, curEmoState);
			if (!curEmoState.IS_EmoEngineEqual()) {
				this.OnEmoEngineEmoStateUpdated(userId, curEmoState);
			}
			if (!curEmoState.IS_FacialExpressionEqual()) {
				this.OnExpressivEmoStateUpdated(userId, curEmoState);
			}
			if (!curEmoState.IS_PerformanceMetricEqual()) {
				this.OnAffectivEmoStateUpdated(userId, curEmoState);
			}
			if (!curEmoState.IS_MentalCommandEqual()) {
				this.OnCognitivEmoStateUpdated(userId, curEmoState);
			}
			break;
		case EdkDll.IEE_Event_t.IEE_MentalCommandEvent:
			var cogType = EdkDll.IEE_MentalCommandEventGetType(); //remove this.hEvent
			switch (cogType) {
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingStarted:
				this.OnCognitivTrainingStarted(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingSucceeded:
				this.OnCognitivTrainingSucceeded(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingFailed:
				this.OnCognitivTrainingFailed(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingCompleted:
				this.OnCognitivTrainingCompleted(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingDataErased:
				this.OnCognitivTrainingDataErased(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingRejected:
				this.OnCognitivTrainingRejected(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandTrainingReset:
				this.OnCognitivTrainingReset(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandAutoSamplingNeutralCompleted:
				this.OnCognitivAutoSamplingNeutralCompleted(userId);
				break;
			case EdkDll.IEE_MentalCommandEvent_t.IEE_MentalCommandSignatureUpdated:
				this.OnCognitivSignatureUpdated(userId);
				break;
			default:
				break;
			}
			break;
		case EdkDll.IEE_Event_t.IEE_FacialExpressionEvent:
			var expEvent = EdkDll.IEE_FacialExpressionEventGetType(); //remove this.hEvent
			switch (expEvent) {
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingStarted:
				this.OnExpressivTrainingStarted(userId);
				break;
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingSucceeded:
				this.OnExpressivTrainingSucceeded(userId);
				break;
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingFailed:
				this.OnExpressivTrainingFailed(userId);
				break;
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingCompleted:
				this.OnExpressivTrainingCompleted(userId);
				break;
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingDataErased:
				this.OnExpressivTrainingDataErased(userId);
				break;
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingRejected:
				this.OnExpressivTrainingRejected(userId);
				break;
			case EdkDll.IEE_FacialExpressionEvent_t.IEE_FacialExpressionTrainingReset:
				this.OnExpressivTrainingReset(userId);
				break;
			default:
				break;
			}
			break;
		case EdkDll.IEE_Event_t.IEE_InternalStateChanged:
			this.OnInternalStateChanged(userId);
			break;
		default:
			break;
		}
	}
};

EmoEngine.prototype.OnUserAdded = function(userId) {
	//ELSPlugin().ELS_ES_GetEmoStateDefault();
	var es = new EmoState();
	this.ES_List.add(userId, es);
	// Trigger 'UserAdded' event with one param : 'userId' is integer
	$(document).trigger('UserAdded', [ userId ]);
};

EmoEngine.prototype.OnUserRemoved = function(userId) {
	this.ES_List.removeItem(userId);
	// Trigger 'UserRemoved' event with one param :'userId' is integer
	$(document).trigger('UserRemoved', [ userId ]);
};

EmoEngine.prototype.OnEmoStateUpdated = function(userId, curEmoState) {
	// Trigger 'EmoStateUpdated' event with two params :'userId' is Int  and 'curEmoState' is an object of EmoState
	$(document).trigger('EmoStateUpdated', [ userId, curEmoState ]);
};

EmoEngine.prototype.OnEmoEngineEmoStateUpdated = function(userId, es) {
	// Trigger 'EmoEngineEmoStateUpdated' event with two params:'userId' is integer and 'es' is an object of EmoState
	$(document).trigger('EmoEngineEmoStateUpdated', [ userId, es ]);
};

EmoEngine.prototype.OnAffectivEmoStateUpdated = function(userId, es) {
	// Trigger 'AffectivEmoStateUpdated' event with two params:'userId' is integer and 'es' is an object of EmoState
	$(document).trigger('AffectivEmoStateUpdated', [ userId, es ]);
};

EmoEngine.prototype.OnCognitivEmoStateUpdated = function(userId, es) {
	// Trigger 'CognitivEmoStateUpdated' event with two params:'userId' is integer and 'es' is an object of EmoState
	$(document).trigger('CognitivEmoStateUpdated', [ userId, es ]);
};

EmoEngine.prototype.OnExpressivEmoStateUpdated = function(userId, es) {
	// Trigger 'ExpressivEmoStateUpdated' event with two params:'userId' is integer and 'es' is an object of EmoState
	$(document).trigger('ExpressivEmoStateUpdated', [ userId, es ]);
};

EmoEngine.prototype.OnCognitivTrainingStarted = function(userId) {
	// Trigger 'CognitivTrainingStarted' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingStarted', [ userId ]);
};

EmoEngine.prototype.OnCognitivTrainingSucceeded = function(userId) {
	// Trigger 'CognitivTrainingSucceeded' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingSucceeded', [ userId ]);
};

EmoEngine.prototype.OnCognitivTrainingFailed = function(userId) {
	// Trigger 'CognitivTrainingFailed' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingFailed', [ userId ]);
};

EmoEngine.prototype.OnCognitivTrainingCompleted = function(userId) {
	// Trigger 'CognitivTrainingCompleted' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingCompleted', [ userId ]);
};

EmoEngine.prototype.OnCognitivTrainingDataErased = function(userId) {
	// Trigger 'CognitivTrainingDataErased' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingDataErased', [ userId ]);
};

EmoEngine.prototype.OnCognitivTrainingRejected = function(userId) {
	// Trigger 'CognitivTrainingRejected' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingRejected', [ userId ]);
};

EmoEngine.prototype.OnCognitivTrainingReset = function(userId) {
	// Trigger 'CognitivTrainingReset' event with one param :'userId' is integer
	$(document).trigger('CognitivTrainingReset', [ userId ]);
};

EmoEngine.prototype.OnCognitivAutoSamplingNeutralCompleted = function(userId) {
	// Trigger 'CognitivAutoSamplingNeutralCompleted' event with one param :'userId' is integer
	$(document).trigger('CognitivAutoSamplingNeutralCompleted', [ userId ]);
};

EmoEngine.prototype.OnCognitivSignatureUpdated = function(userId) {
	// Trigger 'CognitivSignatureUpdated' event with one param :'userId' is integer
	$(document).trigger('CognitivSignatureUpdated', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingStarted = function(userId) {
	// Trigger 'ExpressivTrainingStarted' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingStarted', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingSucceeded = function(userId) {
	// Trigger 'ExpressivTrainingSucceeded' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingSucceeded', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingFailed = function(userId) {
	// Trigger 'ExpressivTrainingFailed' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingFailed', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingCompleted = function(userId) {
	// Trigger 'ExpressivTrainingCompleted' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingCompleted', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingDataErased = function(userId) {
	// Trigger 'ExpressivTrainingDataErased' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingDataErased', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingRejected = function(userId) {
	// Trigger 'ExpressivTrainingRejected' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingRejected', [ userId ]);
};

EmoEngine.prototype.OnExpressivTrainingReset = function(userId) {
	// Trigger 'ExpressivTrainingReset' event with one param :'userId' is integer
	$(document).trigger('ExpressivTrainingReset', [ userId ]);
};

EmoEngine.prototype.OnInternalStateChanged = function(userId) {
	// Trigger 'InternalStateChanged' event with one param :'userId' is integer
	$(document).trigger('InternalStateChanged', [ userId ]);
};

EmoEngine.prototype.OnEmoEngineConnected = function() {
	this.ES_List.clear();
	// Trigger 'EmoEngineConnected' event with one param :'userId' is integer
	$(document).trigger('EmoEngineConnected');
};

EmoEngine.prototype.OnEmoEngineDisconnected = function() {
	this.ES_List.clear();
	// Trigger 'EmoEngineDisconnected' event with one param :'userId' is integer
	$(document).trigger('EmoEngineDisconnected');
};

// <summary>
// Generates Exception
// </summary>
// <param name="errorCode">error code returned from APIs from edk.dll</param>
EmoEngine.errorHandler = function(errorCode) {
	if (errorCode == EdkDll.EDK_OK)
		return;

	var errorStr = "";
	switch (errorCode) {
	case EdkDll.EDK_INVALID_PROFILE_ARCHIVE:
		errorStr = "Invalid profile archive";
		break;
	case EdkDll.EDK_NO_USER_FOR_BASEPROFILE:
		errorStr = "The base profile does not have a user ID";
		break;
	case EdkDll.EDK_CANNOT_ACQUIRE_DATA:
		errorStr = "EmoEngine is unable to acquire EEG input data";
		break;
	case EdkDll.EDK_BUFFER_TOO_SMALL:
		errorStr = "A supplied buffer is not large enough";
		break;
	case EdkDll.EDK_OUT_OF_RANGE:
		errorStr = "Parameter is out of range";
		break;
	case EdkDll.EDK_INVALID_PARAMETER:
		errorStr = "Parameter is invalid";
		break;
	case EdkDll.EDK_PARAMETER_LOCKED:
		errorStr = "Parameter is locked";
		break;
	case EdkDll.EDK_INVALID_USER_ID:
		errorStr = "User ID supplied to the function is invalid";
		break;
	case EdkDll.EDK_EMOENGINE_UNINITIALIZED:
		errorStr = "EmoEngine has not been initialized";
		break;
	case EdkDll.EDK_EMOENGINE_DISCONNECTED:
		errorStr = "Connection with remote instance of EmoEngine has been lost";
		break;
	case EdkDll.EDK_EMOENGINE_PROXY_ERROR:
		$(document).trigger('EmoEngineErrorRemote');
		errorStr = "Unable to establish connection with remote instance of EmoEngine.";
		break;
	case EdkDll.EDK_NO_EVENT:
		errorStr = "There are no new EmoEngine events at this time.";
		break;
	case EdkDll.EDK_GYRO_NOT_CALIBRATED:
		errorStr = "The gyro could not be calibrated.  The headset must remain still for at least 0.5 secs.";
		break;
	case EdkDll.EDK_OPTIMIZATION_IS_ON:
		errorStr = "The requested operation failed due to optimization settings.";
		break;
	case EdkDll.EDK_UNKNOWN_ERROR:
		errorStr = "Unknown error";
		break;
	default:
		$(document).trigger('EmoEngineUnknownError');
		errorStr = "Unknown error";
		break;
	}
	throw errorStr;
};

// <summary>
// Initializes the connection to EmoEngine. This function should be called at the beginning of programs that make use of EmoEngine, most probably in initialization routine or constructor.
// </summary>       
EmoEngine.prototype.Connect = function() {
	//this.errorHandler(EdkDll.EE_EngineConnect());
	this.k = EdkDll.EE_EngineConnect();
	//this.hEvent = EdkDll.EE_EmoEngineEventCreate(); //remove this.hEvent
	//alert("hEvent ="+this.hEvent);
	this.OnEmoEngineConnected();
};

// <summary>
// Initializes the connection to a remote instance of EmoEngine.
// </summary>
// <param name="ip">A string identifying the hostname or IP address of the remote EmoEngine server</param>
// <param name="port">The port number of the remote EmoEngine server. If connecting to the Emotiv Control Panel, use port 3008. If connecting to the EmoComposer, use port 1726</param>
EmoEngine.prototype.RemoteConnect = function(ip, port) {
	EmoEngine.errorHandler(EdkDll.EE_EngineRemoteConnect()); //remove ip,port params
	this.OnEmoEngineConnected();
};

// <summary>
// Terminates the connection to EmoEngine. This function should be called at the end of programs which make use of EmoEngine, most probably in clean up routine or destructor.
// </summary>
EmoEngine.prototype.Disconnect = function() {
	EmoEngine.errorHandler(EdkDll.EE_EngineDisconnect());
	this.OnEmoEngineDisconnected();
};

// <summary>
// Retrieves number of active users connected to the EmoEngine.
// </summary>
// <returns></returns>
EmoEngine.prototype.EngineGetNumUser = function() {
	var numUser = EdkDll.EE_EngineGetNumUser();
	return numUser;
};

// <summary>
// Sets the player number displayed on the physical input device (currently the USB Dongle) that corresponds to the specified user
// </summary>
// <param name="userId">EmoEngine user ID</param>
// <param name="playerNum">application assigned player number displayed on input device hardware (must be in the range 1-4)</param>
EmoEngine.prototype.SetHardwarePlayerDisplay = function(playerNum) {
	EmoEngine.errorHandler(EdkDll.EE_SetHardwarePlayerDisplay(playerNum));
};

// <summary>
// Loads an EmoEngine profile for the specified user.
// </summary>
// <param name="userId">user ID</param>
// <param name="profile">user profile previously returned from EmoEngine.</param>
/* EmoEngine.prototype.SetUserProfile(profileBuffer, length)
{
if (profile == null)
{
	throw new NullReferenceException();
}
byte[] profileBytes = profile.GetBytes();
errorHandler(EdkDll.EE_SetUserProfile(userId, profileBytes, (UInt32)profileBytes.Length)); 
}*/
/*
 EmoEngine.prototype.SetUserProfile(UInt32 userId, Byte[] profileBytes)
 {
 if (profileBytes == null)
 {
 throw new NullReferenceException();
 }
 errorHandler(EdkDll.EE_SetUserProfile(userId, profileBytes, (UInt32)profileBytes.Length));
 }

 // <summary>
 // Fills in the event referred to by hEvent with an EE_ProfileEvent event that contains the profile data for the specified user.
 // </summary>
 // <param name="userId">user ID</param>
 // <returns>user profile</returns>
 public Profile GetUserProfile(UInt32 userId)
 {
 Profile tempProfile = new Profile();
 errorHandler(EdkDll.EE_GetUserProfile(userId, tempProfile.GetHandle()));
 return tempProfile;
 } */

// <summary>
// Loads a user profile from disk and assigns it to the specified user
// </summary>
// <param name="userID">a valid user ID</param>
// <param name="szInputFilename">platform-dependent filesystem path of saved user profile</param>
/* 	EmoEngine.prototype.LoadUserProfile(userID, szInputFilename)
 {
 errorHandler(EdkDll.EE_LoadUserProfile(userID, szInputFilename));
 }

 // <summary>
 // Saves a user profile for specified user to disk
 // </summary>
 // <param name="userID">a valid user ID</param>
 // <param name="szOutputFilename">platform-dependent filesystem path for output file</param>
 EmoEngine.prototype.EE_SaveUserProfile(userID, szOutputFilename)
 {
 errorHandler(EdkDll.EE_SaveUserProfile(userID, szOutputFilename));
 } */

// <summary>
// Set threshold for Expressiv algorithms
// </summary>
// <param name="userId">user ID</param>
// <param name="algoName">Expressiv algorithm type -  EdkDll.EE_ExpressivAlgo_t</param>
// <param name="thresholdName">Expressiv threshold type -  EdkDll.EE_ExpressivThreshold_t</param>
// <param name="value">threshold value (min: 0 max: 1000)</param>
EmoEngine.prototype.ExpressivSetThreshold = function(userId, algoName,
		thresholdName, value) {
	EmoEngine.errorHandler(EdkDll.EE_ExpressivSetThreshold(userId, algoName,
			thresholdName, value));
};

// <summary>
// Returns the delta of the movement of the gyro since the previous call for a particular user
// </summary>
// <param name="userId">user ID</param>
// <return> array with pXOut = array[0],pYOut = array[1]</return>
EmoEngine.prototype.HeadsetGetGyroDelta = function(userId, size) {
	return EdkDll.EE_HeadsetGetGyroDelta(userId); //remove ,size param
};

//////////////////////////////////////////////////////////////////////////////////////

// <summary>
// Get threshold from Expressiv algorithms
// </summary>
// <param name="userId">user ID- UInt32 </param>
// <param name="algoName">Expressiv algorithm type -  EdkDll.EE_ExpressivAlgo_t </param>
// <param name="thresholdName">Expressiv threshold type -  EdkDll.EE_ExpressivThreshold_t </param>
// <returns>receives threshold value</returns>
EmoEngine.prototype.ExpressivGetThreshold = function(userId, algoName,
		thresholdName) {
	var valueOut = EdkDll.EE_ExpressivGetThreshold(userId, algoName,
			thresholdName);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return valueOut;
};

// <summary>
// Set the current facial expression for Expressiv training
// </summary>
// <param name="userId">user ID</param>
// <param name="action">which facial expression would like to be trained -  EdkDll.EE_ExpressivAlgo_t </param>
EmoEngine.prototype.ExpressivSetTrainingAction = function(userId, action) {
	EmoEngine
			.errorHandler(EdkDll.EE_ExpressivSetTrainingAction(userId, action));
};

// <summary>
// Set the control flag for Expressiv training
// </summary>
// <param name="userId">user ID</param>
// <param name="control">pre-defined control command -  EdkDll.EE_ExpressivTrainingControl_t </param>
EmoEngine.prototype.ExpressivSetTrainingControl = function(userId, control) {
	EmoEngine.errorHandler(EdkDll.EE_ExpressivSetTrainingControl(userId,
			control));
};

// <summary>
// Gets the facial expression currently selected for Expressiv training
// </summary>
// <param name="userId">user ID</param>
// <returns>receives facial expression currently selected for training - EdkDll.EE_ExpressivAlgo_t</returns>
EmoEngine.prototype.ExpressivGetTrainingAction = function(userId) {
	var actionOut = EdkDll.EE_ExpressivGetTrainingAction(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return actionOut;
};

// <summary>
// Return the duration of a Expressiv training session
// </summary>
// <param name="userId">user ID</param>
// <returns>receive the training time in ms</returns>
EmoEngine.prototype.ExpressivGetTrainingTime = function(userId) {
	var trainingTimeOut = EdkDll.EE_ExpressivGetTrainingTime(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return trainingTimeOut;
};

// <summary>
// Gets a list of the actions that have been trained by the user
// </summary>
// <param name="userId">user ID</param>
// <returns>receives a bit vector composed of EE_ExpressivAlgo_t contants</returns>
EmoEngine.prototype.ExpressivGetTrainedSignatureActions = function(userId) {
	var trainedActionsOut = EdkDll
			.EE_ExpressivGetTrainedSignatureActions(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return trainedActionsOut;
};

// <summary>
// Gets a flag indicating if the user has trained sufficient actions to activate a trained signature
// </summary>        
// <param name="userId">user ID</param>
// <returns>1 if the user has trained EXP_NEUTRAL and at least one other Expressiv action. Otherwise, 0 is returned.</returns>
EmoEngine.prototype.ExpressivGetTrainedSignatureAvailable = function(userId) {
	var availableOut = EdkDll.EE_ExpressivGetTrainedSignatureAvailable(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return availableOut;
};

// <summary>
// Configures the Expressiv suite to use either the built-in, universal signature or a personal, trained signature
// </summary>
// <remarks>
// Expressiv defaults to use its universal signature.  This function will fail if EE_ExpressivGetTrainedSignatureAvailable returns false.
// </remarks>
// <param name="userId">user ID-UInt32 </param>
// <param name="sigType">signature type to use -  EdkDll.EE_ExpressivSignature_t </param>
EmoEngine.prototype.ExpressivSetSignatureType = function(userId, sigType) {
	EmoEngine
			.errorHandler(EdkDll.EE_ExpressivSetSignatureType(userId, sigType));
};

// <summary>
// Indicates whether the Expressiv suite is currently using either the built-in, universal signature or a trained signature
// </summary>
// <param name="userId">user ID</param>
// <returns>receives the signature type currently in use - EdkDll.EE_ExpressivSignature_t</returns>
EmoEngine.prototype.ExpressivGetSignatureType = function(userId) {
	var sigTypeOut = EdkDll.EE_ExpressivGetSignatureType(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return sigTypeOut;
};

// <summary>
// Set the current Cognitiv active action types
// </summary>
// <param name="userId">user ID</param>
// <param name="activeActions">a bit vector composed of EE_CognitivAction_t contants</param>
EmoEngine.prototype.CognitivSetActiveActions = function(userId, activeActions) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivSetActiveActions(userId,
			activeActions));
};

// <summary>
// Get the current Cognitiv active action types
// </summary>
// <param name="userId">user ID</param>
// <returns>receive a bit vector composed of EE_CognitivAction_t contants</returns>
EmoEngine.prototype.CognitivGetActiveActions = function(userId) {
	var activeActionsOut = EdkDll.EE_CognitivGetActiveActions(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return activeActionsOut;
};

//add action need to enable to list
EmoEngine.prototype.EnableCognitivAction = function(cognitivAction, cogBool) {
	EdkDll.EE_EnableCognitivAction(cognitivAction, cogBool);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
};

//enable list of cognitiv actions
EmoEngine.prototype.EnableCognitivActionsList = function(userId) {
	EdkDll.EE_EnableCognitivActionsList(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
};

//return list of enabled Cognitiv Action
EmoEngine.prototype.CognitivGetActionsEnabled = function(userId) {
	var enabledActions = EdkDll.EE_CognitivGetActionsEnabled(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return enabledActions;
};

// <summary>
// Return the duration of a Cognitiv training session
// </summary>
// <param name="userId">user ID</param>
// <returns>receive the training time in ms</returns>
EmoEngine.prototype.CognitivGetTrainingTime = function(userId) {
	var trainingTimeOut = EdkDll.EE_CognitivGetTrainingTime(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return trainingTimeOut;
};

// <summary>
// Set the training control flag for Cognitiv training
// </summary>
// <param name="userId">user ID</param>
// <param name="control">pre-defined Cognitiv training control - EdkDll.EE_CognitivTrainingControl_t </param>
EmoEngine.prototype.CognitivSetTrainingControl = function(userId, control) {
	EmoEngine.errorHandler(EdkDll
			.EE_CognitivSetTrainingControl(userId, control));
};

// <summary>
// Set the type of Cognitiv action to be trained
// </summary>
// <param name="userId">user ID</param>
// <param name="action">which action would like to be trained -  EdkDll.EE_CognitivAction_t </param>
EmoEngine.prototype.CognitivSetTrainingAction = function(userId, action) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivSetTrainingAction(userId, action));
};

// <summary>
// Get the type of Cognitiv action currently selected for training
// </summary>
// <param name="userId">user ID</param>
// <returns>action that is currently selected for training - EdkDll.EE_CognitivAction_t </returns>
EmoEngine.prototype.CognitivGetTrainingAction = function(userId) {
	var actionOut = EdkDll.EE_CognitivGetTrainingAction(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return actionOut;
};

// <summary>
// Gets a list of the Cognitiv actions that have been trained by the user
// </summary>
// <param name="userId">user ID</param>
// <returns>receives a bit vector composed of EE_CognitivAction_t contants</returns>
EmoEngine.prototype.CognitivGetTrainedSignatureActions = function(userId) {
	var trainedActionsOut = EdkDll
			.EE_CognitivGetTrainedSignatureActions(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return trainedActionsOut;
};

// <summary>
// Gets the current overall skill rating of the user in Cognitiv
// </summary>
// <param name="userId">user ID</param>
// <returns>receives the overall skill rating [from 0.0 to 1.0]</returns>
EmoEngine.prototype.CognitivGetOverallSkillRating = function(userId) {
	var overallSkillRatingOut = EdkDll.EE_CognitivGetOverallSkillRating(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return overallSkillRatingOut;
};

// <summary>
// Gets the current skill rating for particular Cognitiv actions of the user
// </summary>
// <param name="userId">user ID</param>
// <param name="action">a particular action of EE_CognitivAction_t contant</param>
// <returns>receives the action skill rating [from 0.0 to 1.0]</returns>
EmoEngine.prototype.CognitivGetActionSkillRating = function(userId, action) {
	var actionSkillRatingOut = EdkDll.EE_CognitivGetActionSkillRating(userId,
			action);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return actionSkillRatingOut;
};

// <summary>
// Set the overall sensitivity for all Cognitiv actions
// </summary>
// <param name="userId">user ID</param>
// <param name="level">sensitivity level of all actions (lowest: 1, highest: 7)</param>
EmoEngine.prototype.CognitivSetActivationLevel = function(userId, level) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivSetActivationLevel(userId, level));
};

// <summary>
// Set the sensitivity of Cognitiv actions
// </summary>
// <param name="userId"></param>
// <param name="action1Sensitivity">sensitivity of action 1 (min: 1, max: 10)</param>
// <param name="action2Sensitivity">sensitivity of action 2 (min: 1, max: 10)</param>
// <param name="action3Sensitivity">sensitivity of action 3 (min: 1, max: 10)</param>
// <param name="action4Sensitivity">sensitivity of action 4 (min: 1, max: 10)</param>
EmoEngine.prototype.CognitivSetActionSensitivity = function(userId,
		action1Sensitivity, action2Sensitivity, action3Sensitivity,
		action4Sensitivity) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivSetActionSensitivity(userId,
			action1Sensitivity, action2Sensitivity, action3Sensitivity,
			action4Sensitivity));
};

// <summary>
// Get the overall sensitivity for all Cognitiv actions
// </summary>
// <param name="userId">user ID</param>
// <returns>sensitivity level of all actions (min: 1, max: 10)</returns>
EmoEngine.prototype.CognitivGetActivationLevel = function(userId) {
	var levelOut = EdkDll.EE_CognitivGetActivationLevel(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return levelOut;
};

// <summary>
// Query the sensitivity of Cognitiv actions
// </summary>
// <param name="userId">user ID</param>
// <param name="pAction1SensitivityOut">sensitivity of action 1</param>
// <param name="pAction2SensitivityOut">sensitivity of action 2</param>
// <param name="pAction3SensitivityOut">sensitivity of action 3</param>
// <param name="pAction4SensitivityOut">sensitivity of action 4</param>
// Nham trong dll
EmoEngine.prototype.CognitivGetActionSensitivity = function(userId) {
	var allSensitivity = EdkDll.EE_CognitivGetActionSensitivity(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return allSensitivity;
};

// <summary>
// Start the sampling of Neutral state in Cognitiv
// </summary>
// <param name="userId">user ID</param>
EmoEngine.prototype.CognitivStartSamplingNeutral = function(userId) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivStartSamplingNeutral(userId));
};

// <summary>
// Stop the sampling of Neutral state in Cognitiv
// </summary>
// <param name="userId">user ID</param>
EmoEngine.prototype.CognitivStopSamplingNeutral = function(userId) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivStopSamplingNeutral(userId));
};

// <summary>
// Enable or disable signature caching in Cognitiv
// </summary>
// <param name="userId">user ID</param>
// <param name="enabled">flag to set status of caching (1: enable, 0: disable)</param>
EmoEngine.prototype.CognitivSetSignatureCaching = function(userId, enabled) {
	EmoEngine.errorHandler(EdkDll.EE_CognitivSetSignatureCaching(userId,
			enabled));
};

// <summary>
// Enable or disable signature caching in Cognitiv
// </summary>
// <param name="userId">user ID</param>
// <returns>flag to get status of caching (1: enable, 0: disable)</returns>
EmoEngine.prototype.CognitivGetSignatureCaching = function(userId) {
	var enabledOut = EdkDll.EE_CognitivGetSignatureCaching(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return enabledOut;
};

// <summary>
// Set the cache size for the signature caching in Cognitiv
// </summary>
// <param name="userId">user ID</param>
// <param name="size">number of signatures to be kept in the cache (0: unlimited)</param>
EmoEngine.prototype.CognitivSetSignatureCacheSize = function(userId, size) {
	EmoEngine.errorHandler(EdkDll
			.EE_CognitivSetSignatureCacheSize(userId, size));
};

// <summary>
// Get the current cache size for the signature caching in Cognitiv
// </summary>
// <param name="userId">user ID</param>
// <returns>number of signatures to be kept in the cache (0: unlimited)</returns>
EmoEngine.prototype.CognitivGetSignatureCacheSize = function(userId) {
	var sizeOut = EdkDll.EE_CognitivGetSignatureCacheSize(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return sizeOut;
};

/*
// <summary>
// Returns a struct containing details about the specified EEG channel's headset 
// </summary>
// <param name="channelId">channel identifier</param>
// <returns>provides detailed sensor location and other info</returns>
public EdkDll.InputSensorDescriptor_t HeadsetGetSensorDetails(EdkDll.EE_InputChannels_t channelId)
{
	EdkDll.InputSensorDescriptor_t descriptorOut;
	errorHandler(EdkDll.EE_HeadsetGetSensorDetails(channelId, out descriptorOut));
	return descriptorOut;
}
 */
// <summary>
// Returns the current hardware version of the headset and dongle for a particular user
// </summary>
// <param name="userId">user ID</param>
// <returns>hardware version for the user headset/dongle pair. hiword is headset version, loword is dongle version.</returns>
EmoEngine.prototype.HardwareGetVersion = function(userId) {
	var hwVersionOut = EdkDll.EE_HardwareGetVersion(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return hwVersionOut;
};

/*// <summary>
// Returns the current version of the Emotiv SDK software
// </summary>
// <param name="pszVersionOut">SDK software version in X.X.X.X format. Note: current beta releases have a major version of 0.</param>        
// <param name="pBuildNumOut">Build number.  Unique for each release.</param>
EmoEngine.prototype.SoftwareGetVersion = function(out String pszVersionOut, out UInt32 pBuildNumOut)
{
	StringBuilder version = new StringBuilder(128);
	errorHandler(EdkDll.EE_SoftwareGetVersion(version,(UInt32) version.Capacity, out pBuildNumOut));
	pszVersionOut = version.ToString();
}*/

// <summary>
// Returns the delta of the movement of the gyro since the previous call for a particular user
// </summary>
// <param name="userId">user ID</param>
//<return an aray: with x =array[0] and y = array[1]></return>
EmoEngine.prototype.HeadsetGetGyroDelta = function(userId) {
	var array = EdkDll.EE_HeadsetGetGyroDelta(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return array;
};

// <summary>
// Re-zero the gyro for a particular user
// </summary>
// <param name="userId">user ID</param>
EmoEngine.prototype.HeadsetGyroRezero = function(userId) {
	EmoEngine.errorHandler(EdkDll.EE_HeadsetGyroRezero(userId));
};
/*  
// <summary>
// Enables optimization. EmoEngine will try to optimize its performance according to the information passed in with optimization parameter. EmoEngine guarantees the correctness of the results of vital algorithms. For algorithms that are not vital, results are undefined.
// </summary>
// <param name="param">OptimizationParam instance which includes information about how to optimize the performance of EmoEngine.</param>
EmoEngine.prototype.OptimizationEnable  = function( param)
{
	EmoEngine.errorHandler(EdkDll.EE_OptimizationEnable(param.GetHandle()));
}

// <summary>
// Determines whether optimization is on
// </summary>
// <returns>
// receives information about whether optimization is on
// </returns>
public Boolean OptimizationIsEnabled()
{
	Boolean enabledOut = false;
	errorHandler(EdkDll.EE_OptimizationIsEnabled(out enabledOut));
	return enabledOut;
}

// <summary>
// Disables optimization
// </summary>
EmoEngine.prototype.OptimizationDisable()
{
	errorHandler(EdkDll.EE_OptimizationDisable());
}

// <summary>
// Gets optimization parameter.  If optimization is not enabled (this can be checked with EE_OptimmizationIsEnabled) then the results attached to the returned parameter are undefined.
// </summary>
// <returns></returns>
public OptimizationParam OptimizationGetParam()
{
	OptimizationParam param = new OptimizationParam();
	errorHandler(EdkDll.EE_OptimizationGetParam(param.GetHandle()));
	return param;
}

// <summary>
// Resets all settings and user-specific profile data for the specified detection suite
// </summary>
// <param name="userId">user ID</param>
// <param name="suite">detection suite (Expressiv, Affectiv, or Cognitiv)</param>
// <param name="detectionBitVector">identifies specific detections.  Set to zero for all detections.</param>
EmoEngine.prototype.ResetDetection(UInt32 userId, EdkDll.EE_EmotivSuite_t suite, UInt32 detectionBitVector)
{
	errorHandler(EdkDll.EE_ResetDetection(userId, suite, detectionBitVector));
}
 */

/**
 * Insight functions
 */
//<summary>
//Initializes the connection to EmoEngine. This function should be called at the beginning of programs that make use of EmoEngine, most probably in initialization routine or constructor.
//</summary>       
EmoEngine.prototype.IConnect = function() {
	this.k = EdkDll.IEE_EngineConnect();
	this.OnEmoEngineConnected();
};

//<summary>
//Initializes the connection to a remote instance of EmoEngine.
//</summary>
//<param name="ip">A string identifying the hostname or IP address of the remote EmoEngine server</param>
//<param name="port">The port number of the remote EmoEngine server. If connecting to the Emotiv Control Panel, use port 3008. If connecting to the EmoComposer, use port 1726</param>
EmoEngine.prototype.IRemoteConnect = function(ip, port) {
	EmoEngine.errorHandler(EdkDll.IEE_EngineRemoteConnect());
	this.OnEmoEngineConnected();
};

//<summary>
//Terminates the connection to EmoEngine. This function should be called at the end of programs which make use of EmoEngine, most probably in clean up routine or destructor.
//</summary>
EmoEngine.prototype.IDisconnect = function() {
	EmoEngine.errorHandler(EdkDll.IEE_EngineDisconnect());
	this.OnEmoEngineDisconnected();
};

//<summary>
//Retrieves number of active users connected to the EmoEngine.
//</summary>
//<returns></returns>
EmoEngine.prototype.IEngineGetNumUser = function() {
	var numUser = EdkDll.IEE_EngineGetNumUser();
	return numUser;
};

//<summary>
//Sets the player number displayed on the physical input device (currently the USB Dongle) that corresponds to the specified user
//</summary>
//<param name="userId">EmoEngine user ID</param>
//<param name="playerNum">application assigned player number displayed on input device hardware (must be in the range 1-4)</param>
EmoEngine.prototype.SetHardwarePlayerDisplay = function(playerNum) {
	//EmoEngine.errorHandler(EdkDll.EE_SetHardwarePlayerDisplay(playerNum));
};

//<summary>
//Set threshold for Expressiv algorithms
//</summary>
//<param name="userId">user ID</param>
//<param name="algoName">Expressiv algorithm type -  EdkDll.EE_ExpressivAlgo_t</param>
//<param name="thresholdName">Expressiv threshold type -  EdkDll.EE_ExpressivThreshold_t</param>
//<param name="value">threshold value (min: 0 max: 1000)</param>
EmoEngine.prototype.FacialExpressionSetThreshold = function(userId, algoName,
		thresholdName, value) {
	EmoEngine.errorHandler(EdkDll.IEE_FacialExpressionSetThreshold(userId, algoName,
			thresholdName, value));
};

//<summary>
//Returns the delta of the movement of the gyro since the previous call for a particular user
//</summary>
//<param name="userId">user ID</param>
//<return> array with pXOut = array[0],pYOut = array[1]</return>
EmoEngine.prototype.IHeadsetGetGyroDelta = function(userId, size) {
	return EdkDll.IEE_HeadsetGetGyroDelta(userId); //remove ,size param
};

//////////////////////////////////////////////////////////////////////////////////////

//<summary>
//Get threshold from Expressiv algorithms
//</summary>
//<param name="userId">user ID- UInt32 </param>
//<param name="algoName">Expressiv algorithm type -  EdkDll.EE_ExpressivAlgo_t </param>
//<param name="thresholdName">Expressiv threshold type -  EdkDll.EE_ExpressivThreshold_t </param>
//<returns>receives threshold value</returns>
EmoEngine.prototype.FacialExpressionGetThreshold = function(userId, algoName,
		thresholdName) {
	var valueOut = EdkDll.IEE_FacialExpressionGetThreshold(userId, algoName,
			thresholdName);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return valueOut;
};

//<summary>
//Set the current facial expression for Expressiv training
//</summary>
//<param name="userId">user ID</param>
//<param name="action">which facial expression would like to be trained -  EdkDll.EE_ExpressivAlgo_t </param>
EmoEngine.prototype.FacialExpressionSetTrainingAction = function(userId, action) {
	EmoEngine
			.errorHandler(EdkDll.IEE_FacialExpressionSetTrainingAction(userId, action));
};

//<summary>
//Set the control flag for Expressiv training
//</summary>
//<param name="userId">user ID</param>
//<param name="control">pre-defined control command -  EdkDll.EE_ExpressivTrainingControl_t </param>
EmoEngine.prototype.FacialExpressionSetTrainingControl = function(userId, control) {
	EmoEngine.errorHandler(EdkDll.IEE_FacialExpressionSetTrainingControl(userId,
			control));
};

//<summary>
//Gets the facial expression currently selected for Expressiv training
//</summary>
//<param name="userId">user ID</param>
//<returns>receives facial expression currently selected for training - EdkDll.EE_ExpressivAlgo_t</returns>
EmoEngine.prototype.FacialExpressionGetTrainingAction = function(userId) {
	//var actionOut = EdkDll.EE_ExpressivGetTrainingAction(userId);
	//EmoEngine.errorHandler(EdkDll.EE_GetError());
	//return actionOut;
};

//<summary>
//Return the duration of a Expressiv training session
//</summary>
//<param name="userId">user ID</param>
//<returns>receive the training time in ms</returns>
EmoEngine.prototype.FacialExpressionGetTrainingTime = function(userId) {
	//var trainingTimeOut = EdkDll.EE_ExpressivGetTrainingTime(userId);
	//EmoEngine.errorHandler(EdkDll.EE_GetError());
	//return trainingTimeOut;
};

//<summary>
//Gets a list of the actions that have been trained by the user
//</summary>
//<param name="userId">user ID</param>
//<returns>receives a bit vector composed of EE_ExpressivAlgo_t contants</returns>
EmoEngine.prototype.FacialExpressionGetTrainedSignatureActions = function(userId) {
	var trainedActionsOut = EdkDll
			.IEE_FacialExpressionGetTrainedSignatureActions(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return trainedActionsOut;
};

//<summary>
//Gets a flag indicating if the user has trained sufficient actions to activate a trained signature
//</summary>        
//<param name="userId">user ID</param>
//<returns>1 if the user has trained EXP_NEUTRAL and at least one other Expressiv action. Otherwise, 0 is returned.</returns>
EmoEngine.prototype.FacialExpressionGetTrainedSignatureAvailable = function(userId) {
	var availableOut = EdkDll.IEE_FacialExpressionGetTrainedSignatureAvailable(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return availableOut;
};

//<summary>
//Configures the Expressiv suite to use either the built-in, universal signature or a personal, trained signature
//</summary>
//<remarks>
//Expressiv defaults to use its universal signature.  This function will fail if EE_ExpressivGetTrainedSignatureAvailable returns false.
//</remarks>
//<param name="userId">user ID-UInt32 </param>
//<param name="sigType">signature type to use -  EdkDll.EE_ExpressivSignature_t </param>
EmoEngine.prototype.FacialExpressionSetSignatureType = function(userId, sigType) {
	EmoEngine
			.errorHandler(EdkDll.IEE_FacialExpressionSetSignatureType(userId, sigType));
};

//<summary>
//Indicates whether the Expressiv suite is currently using either the built-in, universal signature or a trained signature
//</summary>
//<param name="userId">user ID</param>
//<returns>receives the signature type currently in use - EdkDll.EE_ExpressivSignature_t</returns>
EmoEngine.prototype.FacialExpressionGetSignatureType = function(userId) {
	var sigTypeOut = EdkDll.IEE_FacialExpressionGetSignatureType(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return sigTypeOut;
};

//<summary>
//Set the current Cognitiv active action types
//</summary>
//<param name="userId">user ID</param>
//<param name="activeActions">a bit vector composed of EE_CognitivAction_t contants</param>
EmoEngine.prototype.MentalCommandSetActiveActions = function(userId, activeActions) {
	EmoEngine.errorHandler(EdkDll.IEE_MentalCommandSetActiveActions(userId,
			activeActions));
};

//<summary>
//Get the current Cognitiv active action types
//</summary>
//<param name="userId">user ID</param>
//<returns>receive a bit vector composed of EE_CognitivAction_t contants</returns>
EmoEngine.prototype.MentalCommandGetActiveActions = function(userId) {
	var activeActionsOut = EdkDll.IEE_MentalCommandGetActiveActions(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return activeActionsOut;
};

//add action need to enable to list
EmoEngine.prototype.EnableMentalCommandAction = function(cognitivAction, cogBool) {
	EdkDll.IEE_EnableMentalCommandAction(cognitivAction, cogBool);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
};

//enable list of cognitiv actions
EmoEngine.prototype.EnableMentalCommandActionsList = function(userId) {
	EdkDll.IEE_EnableMentalCommandActionsList(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
};

//return list of enabled Cognitiv Action
EmoEngine.prototype.MentalCommandGetActionsEnabled = function(userId) {
	var enabledActions = EdkDll.IEE_MentalCommandGetActionsEnabled(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return enabledActions;
};

//<summary>
//Return the duration of a Cognitiv training session
//</summary>
//<param name="userId">user ID</param>
//<returns>receive the training time in ms</returns>
EmoEngine.prototype.MentalCommandGetTrainingTime = function(userId) {
	//var trainingTimeOut = EdkDll.EE_CognitivGetTrainingTime(userId);
	//EmoEngine.errorHandler(EdkDll.EE_GetError());
	//return trainingTimeOut;
};

//<summary>
//Set the training control flag for Cognitiv training
//</summary>
//<param name="userId">user ID</param>
//<param name="control">pre-defined Cognitiv training control - EdkDll.EE_CognitivTrainingControl_t </param>
EmoEngine.prototype.MentalCommandSetTrainingControl = function(userId, control) {
	EmoEngine.errorHandler(EdkDll
			.IEE_MentalCommandSetTrainingControl(userId, control));
};

//<summary>
//Set the type of Cognitiv action to be trained
//</summary>
//<param name="userId">user ID</param>
//<param name="action">which action would like to be trained -  EdkDll.EE_CognitivAction_t </param>
EmoEngine.prototype.MentalCommandSetTrainingAction = function(userId, action) {
	EmoEngine.errorHandler(EdkDll.IEE_MentalCommandSetTrainingAction(userId, action));
};

//<summary>
//Get the type of Cognitiv action currently selected for training
//</summary>
//<param name="userId">user ID</param>
//<returns>action that is currently selected for training - EdkDll.EE_CognitivAction_t </returns>
EmoEngine.prototype.MentalCommandGetTrainingAction = function(userId) {
	//var actionOut = EdkDll.EE_CognitivGetTrainingAction(userId);
	//EmoEngine.errorHandler(EdkDll.EE_GetError());
	//return actionOut;
};

//<summary>
//Gets a list of the Cognitiv actions that have been trained by the user
//</summary>
//<param name="userId">user ID</param>
//<returns>receives a bit vector composed of EE_CognitivAction_t contants</returns>
EmoEngine.prototype.MentalCommandGetTrainedSignatureActions = function(userId) {
	var trainedActionsOut = EdkDll
			.IEE_MentalCommandGetTrainedSignatureActions(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return trainedActionsOut;
};

//<summary>
//Gets the current overall skill rating of the user in Cognitiv
//</summary>
//<param name="userId">user ID</param>
//<returns>receives the overall skill rating [from 0.0 to 1.0]</returns>
EmoEngine.prototype.MentalCommandGetOverallSkillRating = function(userId) {
	var overallSkillRatingOut = EdkDll.IEE_MentalCommandGetOverallSkillRating(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return overallSkillRatingOut;
};

//<summary>
//Gets the current skill rating for particular Cognitiv actions of the user
//</summary>
//<param name="userId">user ID</param>
//<param name="action">a particular action of EE_CognitivAction_t contant</param>
//<returns>receives the action skill rating [from 0.0 to 1.0]</returns>
EmoEngine.prototype.MentalCommandGetActionSkillRating = function(userId, action) {
	var actionSkillRatingOut = EdkDll.IEE_MentalCommandGetActionSkillRating(userId,
			action);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return actionSkillRatingOut;
};

//<summary>
//Set the overall sensitivity for all Cognitiv actions
//</summary>
//<param name="userId">user ID</param>
//<param name="level">sensitivity level of all actions (lowest: 1, highest: 7)</param>
EmoEngine.prototype.MentalCommandSetActivationLevel = function(userId, level) {
	EmoEngine.errorHandler(EdkDll.IEE_MentalCommandSetActivationLevel(userId, level));
};

//<summary>
//Set the sensitivity of Cognitiv actions
//</summary>
//<param name="userId"></param>
//<param name="action1Sensitivity">sensitivity of action 1 (min: 1, max: 10)</param>
//<param name="action2Sensitivity">sensitivity of action 2 (min: 1, max: 10)</param>
//<param name="action3Sensitivity">sensitivity of action 3 (min: 1, max: 10)</param>
//<param name="action4Sensitivity">sensitivity of action 4 (min: 1, max: 10)</param>
EmoEngine.prototype.MentalCommandSetActionSensitivity = function(userId,
		action1Sensitivity, action2Sensitivity, action3Sensitivity,
		action4Sensitivity) {
	EmoEngine.errorHandler(EdkDll.IEE_MentalCommandSetActionSensitivity(userId,
			action1Sensitivity, action2Sensitivity, action3Sensitivity,
			action4Sensitivity));
};

//<summary>
//Get the overall sensitivity for all Cognitiv actions
//</summary>
//<param name="userId">user ID</param>
//<returns>sensitivity level of all actions (min: 1, max: 10)</returns>
EmoEngine.prototype.MentalCommandGetActivationLevel = function(userId) {
	var levelOut = EdkDll.IEE_MentalCommandGetActivationLevel(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return levelOut;
};

//<summary>
//Query the sensitivity of Cognitiv actions
//</summary>
//<param name="userId">user ID</param>
//<param name="pAction1SensitivityOut">sensitivity of action 1</param>
//<param name="pAction2SensitivityOut">sensitivity of action 2</param>
//<param name="pAction3SensitivityOut">sensitivity of action 3</param>
//<param name="pAction4SensitivityOut">sensitivity of action 4</param>
//Nham trong dll
EmoEngine.prototype.MentalCommandGetActionSensitivity = function(userId) {
	var allSensitivity = EdkDll.IEE_MentalCommandGetActionSensitivity(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return allSensitivity;
};

//<summary>
//Start the sampling of Neutral state in Cognitiv
//</summary>
//<param name="userId">user ID</param>
EmoEngine.prototype.MentalCommandStartSamplingNeutral = function(userId) {
	//EmoEngine.errorHandler(EdkDll.EE_CognitivStartSamplingNeutral(userId));
};

//<summary>
//Stop the sampling of Neutral state in Cognitiv
//</summary>
//<param name="userId">user ID</param>
EmoEngine.prototype.MentalCommandStopSamplingNeutral = function(userId) {
	//EmoEngine.errorHandler(EdkDll.EE_CognitivStopSamplingNeutral(userId));
};

//<summary>
//Enable or disable signature caching in Cognitiv
//</summary>
//<param name="userId">user ID</param>
//<param name="enabled">flag to set status of caching (1: enable, 0: disable)</param>
EmoEngine.prototype.MentalCommandSetSignatureCaching = function(userId, enabled) {
	EmoEngine.errorHandler(EdkDll.IEE_MentalCommandSetSignatureCaching(userId,
			enabled));
};

//<summary>
//Enable or disable signature caching in Cognitiv
//</summary>
//<param name="userId">user ID</param>
//<returns>flag to get status of caching (1: enable, 0: disable)</returns>
EmoEngine.prototype.MentalCommandGetSignatureCaching = function(userId) {
	var enabledOut = EdkDll.IEE_MentalCommandGetSignatureCaching(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return enabledOut;
};

//<summary>
//Set the cache size for the signature caching in Cognitiv
//</summary>
//<param name="userId">user ID</param>
//<param name="size">number of signatures to be kept in the cache (0: unlimited)</param>
EmoEngine.prototype.MentalCommandSetSignatureCacheSize = function(userId, size) {
	EmoEngine.errorHandler(EdkDll
			.IEE_MentalCommandSetSignatureCacheSize(userId, size));
};

//<summary>
//Get the current cache size for the signature caching in Cognitiv
//</summary>
//<param name="userId">user ID</param>
//<returns>number of signatures to be kept in the cache (0: unlimited)</returns>
EmoEngine.prototype.MentalCommandGetSignatureCacheSize = function(userId) {
	var sizeOut = EdkDll.IEE_MentalCommandGetSignatureCacheSize(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return sizeOut;
};

//<summary>
//Returns the delta of the movement of the gyro since the previous call for a particular user
//</summary>
//<param name="userId">user ID</param>
//<return an aray: with x =array[0] and y = array[1]></return>
EmoEngine.prototype.IHeadsetGetGyroDelta = function(userId) {
	var array = EdkDll.IEE_HeadsetGetGyroDelta(userId);
	EmoEngine.errorHandler(EdkDll.EE_GetError());
	return array;
};

//<summary>
//Re-zero the gyro for a particular user
//</summary>
//<param name="userId">user ID</param>
EmoEngine.prototype.IHeadsetGyroRezero = function(userId) {
	EmoEngine.errorHandler(EdkDll.IEE_HeadsetGyroRezero(userId));
};

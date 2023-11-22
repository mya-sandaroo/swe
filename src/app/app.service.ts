import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class AppService {
    private loginUrl = "/sweapi/login";
    private findAllMeetingsURL = "/sweapi/findAllMeetings";
    private findAllUsersUrl = "/sweapi/findAllUsers"
    private saveMeetingUrl = "/sweapi/saveMeeting";
    private deleteMeetingUrl = "/sweapi/deleteMeeting";
    private closeMeetingUrl = "/sweapi/closeMeeting";
    private header = {"Content-Type": "application/json"};

    constructor(private http: HttpClient) {}
    public loggedInUser: SWEUser = {loginId: ""};
    public getMeetingInfos(user: SWEUser) {
        return this.http.post(this.findAllMeetingsURL, user, {headers: this.header});
    }

    public getUsers() {
        return this.http.get(this.findAllUsersUrl);
    }

    getNewMeetingInfo() {
        return {id: "", title: "", "attendees": [], dateOfMeeting: "", details: "", selectedLocation: "",
        "suggestedLocations": [], createdBy: "", status: ""};
    }

    login(user: SWEUser) {
        return this.http.post<any>(this.loginUrl, user, {headers: this.header});
    }

    save(meeting: MeetingInfo) {
        return this.http.post<any>(this.saveMeetingUrl+"/"+this.loggedInUser.loginId, meeting, {headers: this.header});
    }

    delete(meeting: MeetingInfo) {
        return this.http.post<any>(this.deleteMeetingUrl+"/"+this.loggedInUser.loginId, meeting, {headers: this.header});
    }
    
    close(meeting: MeetingInfo) {
        return this.http.post<any>(this.closeMeetingUrl+"/"+this.loggedInUser.loginId, meeting, {headers: this.header});
    }
}

export interface MeetingInfo {
    id?: String,
    title: String,
    attendeeList: String[],
    attendees: SWEUser[],
    dateOfMeeting: String,
    details: String,
    selectedLocation: String,
    suggestedLocations: Suggestion[],
    createdBy: String,
    status: String
}

export interface Suggestion {
    location: String,
    suggestedBy: String
}

export interface SWEUser {
    id?: number,
    loginId: String,
    loginName?: String,
    loginPassword?: String
}
var WebBrowser = Object.freeze({
  BrowserName: {
    Unknown: 'Unknown',
    InternetExplorer: 'InternetExplorer',
    Firefox: 'Firefox',
    Chrome: 'Chrome',
    Opera: 'Opera',
    Safari: 'Safari',
    Dolphin: 'Dolphin',
    Konqueror: 'Konqueror',
    Linx: 'Linx',
  },
});

class Speaker {
  constructor() {
    this.speakerId = null;
    this.appr = false;
    this.ot = ['Cobol', 'Punch Cards', 'Commodore', 'VBScript'];
    this.domains = ['aol.com', 'hotmail.com', 'prodigy.com', 'CompuServe.com'];
    this.emps = ['Microsoft', 'Google', 'Fog Creek Software', '37Signals'];
  }

  checkData() {
    if (!this.firstName.trim()) {
      throw new Error('First Name is required');
    } else if (!this.lastName.trim()) {
      throw new Error('Last Name is required');
    } else if (!this.email.trim()) {
      throw new Error('Email is required');
    }
  }

  calculateFee() {
    if (this.exp <= 1) {
      this.registrationFee = 500;
    } else if (this.exp <= 3) {
      this.registrationFee = 250;
    } else if (this.exp <= 5) {
      this.registrationFee = 100;
    } else if (this.exp <= 9) {
      this.registrationFee = 50;
    } else {
      this.registrationFee = 0;
    }
  }

  register = (repository) => {
    var emailParts = this.email.split('@');
    var emailDomain = emailParts[emailParts.length - 1];
    this.checkData()
    this.isStatusGood =
      this.exp > 10 ||
      this.hasBlog ||
      this.certifications.length > 3 ||
      this.emps.includes(this.employer) ||
      (!this.domains.includes(emailDomain) &&
        !(
          this.browser.name ==
          WebBrowser.BrowserName.InternetExplorer &&
          this.browser.majorVersion < 9
        ))

    if (this.isStatusGood) {
      if (this.sessions.length !== 0) {
        // if (this.sessions.some(session => session.title.includes(tech) || session.description.includes(tech))) {
        //   session.approved = false;
        // } else {
        //   session.aprroved = true;
        //   this.appr = true;
        // }
        
          for (var tech of this.ot) {
            if (
              session.title.includes(tech) ||
              session.description.includes(tech)
            ) {
              session.approved = false;
              break;
            } else {
              session.aprroved = true;
              this.appr = true;
            }
          }
       
      } else {
        throw new Error(
          "Can't register speaker with no sessions to present."
        );
      }

      if (this.appr) {

        this.calculateFee();

        try {
          this.speakerId = repository.saveSpeaker(this);
        } catch (e) {
          //in case the db call fails
        }
      } else {
        throw new Error('No sessions approved.');
      }
    } else {
      throw new Error(
        "Speaker doesn't meet our abitrary and capricious standards."
      );
    }
    return this.speakerId;
  };
}

module.exports = {
  Speaker: Speaker,
  WebBrowser: WebBrowser,
};
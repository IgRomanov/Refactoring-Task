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
  #speakerId;
  #isApproved;
  #oldTechs;
  #oldDomains
  #emps;
  constructor() {
    this.#speakerId = null;
    this.#isApproved = false;
    this.#oldTechs = ['Cobol', 'Punch Cards', 'Commodore', 'VBScript'];
    this.#oldDomains = ['aol.com', 'hotmail.com', 'prodigy.com', 'CompuServe.com'];
    this.#emps = ['Microsoft', 'Google', 'Fog Creek Software', '37Signals'];
  }

  #checkData() {
    if (!this.firstName.trim()) {
      throw new Error('First Name is required');
    } else if (!this.lastName.trim()) {
      throw new Error('Last Name is required');
    } else if (!this.email.trim()) {
      throw new Error('Email is required');
    }
  }

  #calculateFee() {
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

  #setSessionApproved() {
    if (this.sessions.length === 0) {
      throw new Error("Can't register speaker with no sessions to present.");
    }
    for (const session of this.sessions) {
      for (const tech of this.#oldTechs) {
        if (session.title.includes(tech) || session.description.includes(tech)) {
          session.approved = false;
          break;
        } else {
          session.aprroved = true;
          this.#isApproved = true;
        }
      }
    }
  }

  #saveSpeaker(repository) {
    if (this.#isApproved) {
      this.#calculateFee();
      try {
        this.#speakerId = repository.saveSpeaker(this);
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new Error('No sessions approved.');
    }
  }

  #checkStatus() {
    const emailDomain = this.email.split('@')[1];
    const isStatusGood = (
      this.isStatusGood ||
      this.exp > 10 ||
      this.hasBlog ||
      this.certifications.length > 3 ||
      this.#emps.includes(this.employer) ||
      (!this.#oldDomains.includes(emailDomain) &&
        (
          this.browser.name !==
          WebBrowser.BrowserName.InternetExplorer &&
          this.browser.majorVersion > 9
        )
      )
    )
    if (!isStatusGood) {
      throw new Error("Speaker doesn't meet our abitrary and capricious standards.");
    }
  }

  register = (repository) => {
    this.#checkData();
    this.#checkStatus();
    this.#setSessionApproved();
    this.#saveSpeaker(repository);
    return this.#speakerId;
  };
}

module.exports = {
  Speaker,
  WebBrowser,
};
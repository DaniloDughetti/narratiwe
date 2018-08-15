import { Injectable } from '@angular/core';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';


@Injectable()
export class SocialService {

  constructor(private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '597883093888600',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
  }

  shareStory(story: string) {
    let params: UIParams = {
      href: 'http://narratiwe.com/home/story-preview/' + story,
      method: 'share'
    };
    return this.fb.ui(params);
  }

  shareChapter(chapter: string) {
    let params: UIParams = {
      href: 'http://narratiwe.com/home/chapter-preview/' + chapter,
      method: 'share'
    };
    return this.fb.ui(params);
  }

}

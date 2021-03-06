import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LeaderBoardsProvider } from "../../providers/leader-boards/leader-boards";

/**
 * Generated class for the LeaderBoardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leader-board',
  templateUrl: 'leader-board.html',
})
export class LeaderBoardPage {
  list = [];
  @ViewChild('elem', { read: ElementRef }) someInput: QueryList<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public leaderBoard: LeaderBoardsProvider,
    public viewCtrl: ViewController, ) {
  }

  ionViewDidLoad() {
    this.leaderBoard.getLeaderBoard().then((data: any) => {
      console.log(data);
      this.list = data.leaders;
    }, error => {
      console.log(error)
    })
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.someInput);
/*      this.someInput.forEach(elem => { console.log(elem.nativeElement) })
*/    /* console.log(document.getElementById('I50').offsetTop);
      document.getElementById('scroll').scrollTop = document.getElementById('I50').offsetTop;
*/



    }, 1000)
  }
}

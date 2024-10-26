import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateChannelDialogComponent } from './create-channel-dialog/create-channel-dialog.component';
import { ClickStopPropagationDirective } from '../../shared/directives/click-stop-propagation.directive';
import { UserData } from '../../shared/models/user.model';
import { ChannelService } from '../../shared/services/channel-service/channel.service';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    CommonModule,
    ClickStopPropagationDirective,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  readonly panelOpenState = signal(false);
  channelService = inject(ChannelService);
  @Input() userData!: UserData;
  allChannelsData: Channel[] = [];

  constructor(public dialog: MatDialog) {}

  // ngOnInit(): void {
  //   this.loadAllChannelsData();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData']) {
      this.loadAllChannelsData();
    }
  }

  openCreateChannelDialog(): void {
    this.dialog.open(CreateChannelDialogComponent, {
      panelClass: 'create-channel-dialog',
    });
  }

  loadAllChannelsData(): void {
    this.allChannelsData = []; // Initialisiere die Liste neu

    this.userData.channels.forEach((channelId) => {
      this.channelService.getChannelById(channelId).subscribe((channelData) => {
        if (!channelData) return;
        const existingIndex = this.allChannelsData.findIndex(
          (c) => c.channelId === channelData.channelId
        );

        if (existingIndex > -1) {
          // Aktualisiere das bestehende Channel-Datenobjekt
          this.allChannelsData[existingIndex] = channelData;
        } else {
          // Füge den Channel hinzu, wenn er noch nicht existiert
          this.allChannelsData.push(channelData);
        }
      });
    });
  }
}

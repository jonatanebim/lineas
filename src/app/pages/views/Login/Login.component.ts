import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { CommonsRequestsService } from '../../../shared/requests/commons.requests'
import { LocalStorageService } from 'ngx-webstorage'
import { catchError, of } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements AfterViewInit {
  fb = inject(FormBuilder)
  router = inject(Router)
  commonService = inject(CommonsRequestsService)
  localSt = inject(LocalStorageService)

  fg = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  })

  get u() {
    return this.fg.controls['username'].value || ''
  }

  get pwd() {
    return this.fg.controls['password'].value || ''
  }

  ngAfterViewInit(): void {
    if (this.localSt.retrieve('user')) {
      this.router.navigate(['/dashboard'])
    }
  }

  doSubmit() {
    this.commonService
      .login(this.u, this.pwd)
      .pipe(
        catchError((error: any) => {
          return of(error)
        })
      )
      .subscribe((userData: any) => {
        this.localSt.store('user', userData)
        this.router.navigate(['/dashboard'])
      })
  }
}

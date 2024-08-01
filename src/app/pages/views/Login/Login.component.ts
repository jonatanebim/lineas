import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
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
  isLoading = signal(false)

  fg = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  })

  get u() {
    return this.fg.controls['username'] as FormControl
  }

  get pwd() {
    return this.fg.controls['password'] as FormControl
  }

  ngAfterViewInit(): void {
    if (this.localSt.retrieve('user')) {
      this.router.navigate(['/dashboard'])
    }

    this.fg.valueChanges.subscribe(() => {
      this.u.setErrors(null)
      this.pwd.setErrors(null)
    })
  }

  doSubmit() {
    this.isLoading.update(() => true)
    this.commonService
      .login(this.u?.value, this.pwd?.value)
      .pipe(
        catchError((error: any) => {
          this.isLoading.update(() => false)
          this.u.setErrors({ invalid: true })
          this.pwd.setErrors({ invalid: true })
          return of(error)
        })
      )
      .subscribe((responseData: any) => {
        this.isLoading.update(() => false)
        if (responseData?.IsValid) {
          this.localSt.store('user', responseData)
          this.router.navigate(['/dashboard'])
        } else {
          // toastr
        }
      })
  }
}

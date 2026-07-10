# Place builds here after compilation

After building, copy artifacts:

| Platform | Source (after `npm run tauri:build`) | Destination |
|----------|--------------------------------------|-------------|
| Windows  | `*.exe` in `target/release/bundle/`  | `ScooterLab_0.1.0_x64-setup.exe` |
| macOS    | `*.dmg`                              | `ScooterLab_0.1.0_universal.dmg` |
| Linux    | `*.AppImage`                         | `ScooterLab_0.1.0_amd64.AppImage` |
| Android  | `*.apk` from `tauri android build`   | `ScooterLab_0.1.0_android.apk` |
| iOS      | `*.ipa` from `tauri ios build`       | `ScooterLab_0.1.0_ios.ipa` |

Run `npm run build:all` from project root to build everything.

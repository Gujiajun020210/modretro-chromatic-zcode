# ModRetro Chromatic Bridge

Use this ZCode plugin to call the official ModRetro Chromatic plugin already installed in Codex on the same machine. The bridge discovers the existing Codex plugin and starts its MCP server without modifying that installation.

## Requirements

- The official ModRetro Chromatic Codex plugin installed and enabled.
- Node.js 22 or newer.

Ask ZCode to create a Game Boy Color game, inspect or edit a GB Studio project, build a ROM, or run it in the emulator. Codex-specific annotation handoffs are not included. Hardware activation and cartridge writes still follow the official plugin's requirements.

本插件让 ZCode 调用同一台电脑已经安装的官方 Codex ModRetro Chromatic 插件。启动器只读取并运行现有安装，不修改 Codex 插件目录，也不附带厂商二进制程序。

安装后可以直接说：“制作一个 Game Boy Color 平台跳跃小游戏并打开预览。”编译器、模拟器、设备激活和写卡确认仍按官方插件的要求处理。

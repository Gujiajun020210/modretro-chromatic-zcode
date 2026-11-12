---
name: modretro-chromatic-zcode
description: 在 ZCode 中制作、编辑、编译和试玩 Game Boy / Game Boy Color 游戏，或调试 ModRetro Chromatic 设备。需要本机已安装官方 Codex ModRetro Chromatic 插件。
---

# ModRetro Chromatic 本机桥接

通过本插件提供的 MCP 工具调用本机已经安装的官方 Codex ModRetro Chromatic 插件。此桥接包不附带官方程序，不代替依赖准备，也不管理 Codex 插件的安装或升级。

## 先确认运行条件

- 本机必须已经安装并启用官方 Codex ModRetro Chromatic 插件，且需要 Node.js 22 或更新版本。
- 如果 MCP 无法启动，报告启动器返回的具体错误。不要假装工具可用，也不要下载来路不明的替代包。
- 开始游戏任务后，先调用 `session_status` 和 `toolchain_doctor`。缺少编译器或模拟器时，按任务需要调用 `toolchain_prepare` 准备 `build` 或 `emulator` 组件，然后继续原任务。
- `MODRETRO_CHROMATIC_CODEX_ROOT` 可指向另一份已有的官方插件目录；只有用户明确配置时才使用它。

## 制作和编辑游戏

- 始终操作用户真实的 `.gbsproj` / `.gbsres` 项目，保持项目可在 GB Studio 中继续编辑；不要用伪造项目、静态图片或无关示例冒充游戏。
- 新游戏使用 `project_create` 并传入尚不存在的绝对目标路径；继续工作时使用 `select: true`。已有项目使用 `project_select` 和它的绝对 `.gbsproj` 路径。
- 先调用 `project_inspect` 和必要的 `project_inventory`，再用语义化工具修改场景、角色、事件、对话、碰撞、像素资源和设置。保留未知字段、原生 ID 和用户已有内容。
- 根据请求的复杂度参考本机官方插件随附的技能和文档；不要让 Codex 专属的 **Ask Codex** 或标注交接按钮成为完成任务的必要条件。

## 编译和试玩

- 使用 `rom_build` 构建真实 `.gb` 或 `.gbc` 文件，再用 `rom_inspect` 检查返回的 ROM。
- 使用 `web_preview` 创建官方浏览器预览，并在 ZCode 支持的浏览器界面中打开返回的 URL。浏览器不可用时保留 URL 和具体错误，使用 `emulator_run`、`emulator_step` 和 `emulator_observe` 在相同 ROM 上继续验证。
- 区分源码检查、成功编译、模拟器画面和真实硬件结果；没有实际观察到的行为不要声称已经验证。
- 只关闭当前任务自己创建的预览或模拟器会话，保留用户的存档、录音和其他会话。

## Chromatic 设备

- 使用 `device`、`device_capture`、`play` 和 `flash` 的公开工具。设备激活通过官方 ModRetro Updater 完成，不要索取或保存激活码。
- 写卡前说明 ROM 路径、大小、摘要和目标设备。首次写入必须明确告诉用户这会擦除卡带现有游戏数据、存档可能丢失且不会备份，并取得该次写入的明确许可。
- 操作结果不明时先查询原操作状态，不要自动重试写入。

## 桥接边界

此项目是由社区维护的 ZCode 适配器，不是 ModRetro 或 OpenAI 官方独立发行版。它只连接用户本机已有的官方 Codex 插件，不重新分发厂商二进制程序、编译后的服务器或激活信息。

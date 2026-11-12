# ModRetro Chromatic Bridge for ZCode

在 ZCode 中使用本机已安装的官方 **ModRetro Chromatic Codex 插件**，制作、编译和试玩 Game Boy / Game Boy Color 游戏。

这是一个社区维护的桥接器，**不是独立版官方插件**。公网仓库不包含 ModRetro 的闭源设备程序、编译后的 MCP 服务或任何激活信息。

## 安装条件

- ZCode 桌面版。
- 本机已安装并启用官方 Codex ModRetro Chromatic 插件。
- Node.js 22 或更新版本。
- 制作可玩游戏时所需的编译器和模拟器仍由官方插件按需准备。

## 在 ZCode 中添加市场

1. 打开一个工作区，进入 **设置 → 插件**。
2. 选择 **创建 → 添加插件市场**。
3. 填入仓库地址：`https://github.com/Gujiajun020210/modretro-chromatic-zcode`。
4. 在 **个人** 分组找到 **ModRetro Chromatic 本机桥接**，点击 **安装** 并启用。

ZCode 市场格式和安装方式见[官方插件文档](https://zcode.z.ai/cn/docs/plugin)。

## 使用

安装后直接提出自然语言需求，例如：

- 制作一个 Game Boy Color 平台跳跃小游戏，并打开预览。
- 检查这个 GB Studio 项目并修复编译错误。
- 把这个 ROM 放进模拟器，检查角色跳跃是否正常。

MCP 服务启动时会查找：

- `$CODEX_HOME/plugins/cache/openai-curated-remote/modretro-chromatic/`；
- `$CODEX_HOME/plugins/cache/openai-curated/modretro-chromatic/`；
- 未设置 `CODEX_HOME` 时使用 `~/.codex`。

也可将 `MODRETRO_CHROMATIC_CODEX_ROOT` 设置为另一份已有的官方插件目录。桥接器只读取并启动现有安装，不修改 Codex 插件目录。

## 边界

- Codex 专属的 **Ask Codex** 和标注交接按钮不属于此桥接器。
- 实体设备激活仍通过官方 ModRetro Updater 完成。
- 写卡会擦除现有卡带数据，必须按照插件提示单独确认。

本适配器代码采用 MIT 许可证。ModRetro、Chromatic、OpenAI 和 Codex 的名称与标识归各自所有者所有。
